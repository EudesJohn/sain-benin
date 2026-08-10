import type { ComponentType } from 'react'

interface IconTileProps {
  icon: ComponentType<{ className?: string }>
  tone?: 'leaf' | 'sun' | 'earth' | 'sky'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const tones: Record<NonNullable<IconTileProps['tone']>, string> = {
  leaf: 'bg-leaf-600/10 text-leaf-700',
  sun: 'bg-sun-500/10 text-sun-700',
  earth: 'bg-earth-500/10 text-earth-700',
  sky: 'bg-sky-600/10 text-sky-700',
}

const sizes: Record<NonNullable<IconTileProps['size']>, string> = {
  sm: 'w-11 h-11 rounded-xl [&>svg]:w-5 [&>svg]:h-5',
  md: 'w-14 h-14 rounded-2xl [&>svg]:w-7 [&>svg]:h-7',
  lg: 'w-16 h-16 rounded-2xl [&>svg]:w-8 [&>svg]:h-8',
}

/**
 * IconTile — pastille d'icône sur fond teinté, cohérente partout.
 */
export const IconTile = ({ icon: Icon, tone = 'leaf', size = 'md', className = '' }: IconTileProps) => (
  <div className={`flex items-center justify-center flex-shrink-0 ${tones[tone]} ${sizes[size]} ${className}`}>
    <Icon aria-hidden="true" />
  </div>
)

export default IconTile