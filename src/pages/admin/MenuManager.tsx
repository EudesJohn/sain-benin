import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reorder, useDragControls } from 'framer-motion'
import {
  Utensils,
  Plus,
  Save,
  Trash2,
  Loader2,
  Check,
  GripVertical,
  Info,
  Globe,
} from 'lucide-react'
import {
  fetchSectionMenus,
  upsertMenuCategory,
  deleteMenuCategory,
  reorderMenuCategories,
  upsertMenuItem,
  deleteMenuItem,
  reorderMenuItems,
  type MenuCategory,
  type MenuItem,
} from '../../lib/menuService'
import { MENU_SECTIONS } from '../../lib/sections'

/* ─────────────────────────────────────────────
   Plat — ligne réordonnable dans sa catégorie
────────────────────────────────────────────── */
interface MenuItemRowProps {
  categoryId: string
  item: MenuItem
  onRemoved: (itemId: string) => void
  onChanged: () => void
}

const MenuItemRow = ({ categoryId, item, onRemoved, onChanged }: MenuItemRowProps) => {
  const { t } = useTranslation()
  const dragControls = useDragControls()
  const [name, setName] = useState(item.name)
  const [nameEn, setNameEn] = useState(item.name_en)
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setBusy('save')
    const ok = await upsertMenuItem(categoryId, {
      id: item.id,
      name: name.trim(),
      name_en: nameEn.trim(),
      position: item.position,
    })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  const remove = async () => {
    if (!item.id) return
    setBusy('delete')
    await deleteMenuItem(item.id)
    setBusy(null)
    onRemoved(item.id)
  }

  return (
    <Reorder.Item value={item} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          aria-label="Réordonner ce plat (glisser-déposer)"
          title="Glisser-déposer pour réordonner"
          className="touch-none flex items-center justify-center w-9 h-9 flex-shrink-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <GripVertical className="w-4 h-4" aria-hidden="true" />
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label={t('admin.dishNameFr')}
          placeholder={t('admin.dishNameFr')}
          className="flex-1 min-w-0 px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
        />
        <input
          type="text"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          aria-label={t('admin.dishNameEn')}
          placeholder={t('admin.dishNameEn')}
          className="flex-1 min-w-0 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
        />
        <button
          type="button"
          onClick={save}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
        >
          {busy === 'save' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Save className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          {busy === 'save' ? '...' : saved ? '✓' : ''}
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Catégorie de menu — nom, plats, réordonnancement
────────────────────────────────────────────── */
interface MenuCategoryCardProps {
  sectionSlug: string
  category: MenuCategory
  onChanged: () => void
}

const MenuCategoryCard = ({ sectionSlug, category, onChanged }: MenuCategoryCardProps) => {
  const { t } = useTranslation()
  const dragControls = useDragControls()
  const [name, setName] = useState(category.name)
  const [nameEn, setNameEn] = useState(category.name_en)
  const [items, setItems] = useState<MenuItem[]>(category.items)
  const [newItem, setNewItem] = useState('')
  const [newItemEn, setNewItemEn] = useState('')
  const [busy, setBusy] = useState<'save' | 'delete' | 'addItem' | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inputClass =
    'px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  const saveCategory = async () => {
    if (!name.trim()) {
      setError(t('admin.categoryRequired'))
      return
    }
    setError(null)
    setBusy('save')
    const ok = await upsertMenuCategory(sectionSlug, {
      id: category.id,
      name: name.trim(),
      name_en: nameEn.trim(),
      position: category.position,
    })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  const removeCategory = async () => {
    if (!category.id) return
    setBusy('delete')
    await deleteMenuCategory(category.id)
    setBusy(null)
    onChanged()
  }

  const addItem = async () => {
    if (!category.id || !newItem.trim()) return
    setBusy('addItem')
    const maxPosition = items.reduce((max, i) => Math.max(max, i.position), -1)
    const id = await upsertMenuItem(category.id, {
      name: newItem.trim(),
      name_en: newItemEn.trim(),
      position: maxPosition + 1,
    })
    setBusy(null)
    if (id) {
      setItems((prev) => [...prev, { id, name: newItem.trim(), name_en: newItemEn.trim(), position: maxPosition + 1 }])
      setNewItem('')
      setNewItemEn('')
      onChanged()
    }
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
    onChanged()
  }

  const handleItemsReorder = (next: MenuItem[]) => {
    const updated = next.map((i, index) => ({ ...i, position: index }))
    setItems(updated)
    reorderMenuItems(updated).then((ok) => {
      if (!ok) onChanged()
    })
  }

  return (
    <Reorder.Item value={category} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* En-tête : poignée + nom + actions */}
        <div className="flex items-center gap-2 p-4 pb-2 flex-wrap">
          <button
            type="button"
            onPointerDown={(e) => dragControls.start(e)}
            aria-label="Réordonner cette catégorie (glisser-déposer)"
            title="Glisser-déposer pour réordonner"
            className="touch-none flex items-center justify-center w-10 h-10 flex-shrink-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <GripVertical className="w-5 h-5" aria-hidden="true" />
          </button>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label={t('admin.categoryNameFr')}
            placeholder={t('admin.categoryNameFr')}
            className={`${inputClass} flex-1 min-w-40`}
          />
          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            aria-label={t('admin.categoryNameEn')}
            placeholder={t('admin.categoryNameEn')}
            className={`${inputClass} flex-1 min-w-40 border-blue-200`}
          />
          <button
            type="button"
            onClick={saveCategory}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
          >
            {busy === 'save' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            ) : saved ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Save className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {busy === 'save' ? '...' : saved ? '✓' : ''}
          </button>
          <button
            type="button"
            onClick={removeCategory}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
        {error && <p className="text-xs text-red-700 px-4 pb-2">{error}</p>}

        {/* Ajout d'un plat */}
        <div className="flex items-center gap-2 px-4 py-2 flex-wrap">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            aria-label={t('admin.newDishFr')}
            placeholder={t('admin.newDishFr')}
            className={`${inputClass} flex-1 min-w-40`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addItem()
              }
            }}
          />
          <input
            type="text"
            value={newItemEn}
            onChange={(e) => setNewItemEn(e.target.value)}
            aria-label={t('admin.newDishEn')}
            placeholder={t('admin.newDishEn')}
            className={`${inputClass} flex-1 min-w-40 border-blue-200`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addItem()
              }
            }}
          />
          <button
            type="button"
            onClick={addItem}
            disabled={busy !== null || !newItem.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
          >
            {busy === 'addItem' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {t('admin.addDish')}
          </button>
        </div>

        {/* Plats */}
        {items.length > 0 ? (
          <div className="p-4 pt-1">
            <div className="flex items-center gap-2 px-2 mb-2 text-xs text-ink-faint">
              <span className="flex-1 font-medium">FR</span>
              <span className="w-20" />
              <span className="flex-1 font-medium">EN</span>
              <span className="w-20" />
            </div>
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={handleItemsReorder}
              className="space-y-2"
            >
              {items.map((item) => (
                <MenuItemRow
                  key={item.id ?? `new-${item.name}-${item.position}`}
                  categoryId={category.id ?? ''}
                  item={item}
                  onRemoved={removeItem}
                  onChanged={onChanged}
                />
              ))}
            </Reorder.Group>
          </div>
        ) : (
          <p className="text-sm text-ink-soft px-4 pb-4">
            {t('admin.noDishes')}
          </p>
        )}
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Gestion des menus d'une section
────────────────────────────────────────────── */
interface MenuManagerProps {
  sectionSlug: string
}

const MenuManager = ({ sectionSlug }: MenuManagerProps) => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [order, setOrder] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryNameEn, setNewCategoryNameEn] = useState('')
  const [error, setError] = useState<string | null>(null)

  const config = MENU_SECTIONS[sectionSlug]

  const load = useCallback(async () => {
    setLoading(true)
    const fetched = await fetchSectionMenus(sectionSlug)
    setCategories(fetched)
    setOrder([...fetched].sort((a, b) => a.position - b.position))
    setLoading(false)
  }, [sectionSlug])

  useEffect(() => {
    load()
  }, [load])

  const handleReorder = (next: MenuCategory[]) => {
    const updated = next.map((c, i) => ({ ...c, position: i }))
    setOrder(updated)
    reorderMenuCategories(updated).then((ok) => {
      if (!ok) load()
    })
  }

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      setError(t('admin.categoryRequired'))
      return
    }
    setError(null)
    setAdding(true)
    const maxPosition = categories.reduce((max, c) => Math.max(max, c.position), -1)
    const ok = await upsertMenuCategory(sectionSlug, {
      name: newCategoryName.trim(),
      name_en: newCategoryNameEn.trim(),
      position: maxPosition + 1,
    })
    setAdding(false)
    if (ok) {
      setNewCategoryName('')
      setNewCategoryNameEn('')
      load()
    }
  }

  if (!config) {
    return (
      <div className="flex items-start gap-3 bg-white rounded-2xl shadow-card p-6 text-ink-soft">
        <Info className="w-5 h-5 text-sun-600 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm">
          {t('admin.noMenus')}
        </p>
      </div>
    )
  }

  const inputClass =
    'px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink flex items-center gap-2">
          <Utensils className="w-6 h-6 text-sun-600" aria-hidden="true" />
          {t('admin.menus')}
        </h2>
        <p className="text-sm text-ink-soft">
          {config.label} — {t('admin.menusDescription')}
        </p>
      </div>

      {/* Formulaire d'ajout de catégorie */}
      <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          aria-label={t('admin.newCategoryFr')}
          placeholder={t('admin.newCategoryFr')}
          className={`${inputClass} flex-1`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addCategory()
            }
          }}
        />
        <input
          type="text"
          value={newCategoryNameEn}
          onChange={(e) => setNewCategoryNameEn(e.target.value)}
          aria-label={t('admin.newCategoryEn')}
          placeholder={t('admin.newCategoryEn')}
          className={`${inputClass} flex-1 border-blue-200`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addCategory()
            }
          }}
        />
        <button
          type="button"
          onClick={addCategory}
          disabled={adding}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-10 text-sm font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Plus className="w-4 h-4" aria-hidden="true" />
          )}
          {t('admin.addCategory')}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Indicateur bilingual */}
      <div className="flex items-center gap-2 text-sm text-blue-600">
        <Globe className="w-4 h-4" />
        <span>{t('admin.bilingualHint')}</span>
      </div>

      {/* Liste des catégories */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-ink-soft">
          <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
          {t('common.loading')}
        </div>
      ) : order.length > 0 ? (
        <>
          <p className="text-sm text-ink-soft">
            {t('admin.dragReorder')}
          </p>
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={handleReorder}
            className="space-y-4"
          >
            {order.map((category) => (
              <MenuCategoryCard
                key={category.id ?? category.name}
                sectionSlug={sectionSlug}
                category={category}
                onChanged={load}
              />
            ))}
          </Reorder.Group>
        </>
      ) : (
        <p className="text-sm text-ink-soft bg-white rounded-2xl shadow-card p-6">
          {t('admin.noCategoriesYet')}
        </p>
      )}
    </div>
  )
}

export default MenuManager
