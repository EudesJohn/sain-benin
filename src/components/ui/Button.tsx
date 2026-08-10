import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ReactNode, ComponentProps } from 'react'

/**
 * Button — primitive UI avec feedback au clic (Emil Kowalski: scale(0.97)
 * sur :active, easing sur-mesure, durées < 300ms).
 * Rends un <Link> si `to` est fourni, sinon un <button>.
 */
type Variant = 'primary' | 'accent' | 'outline' | 'ghost-light'
type Size = 'md' | 'lg' | 'sm'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
}

interface AsButton extends BaseProps, Omit<ComponentProps<'button'>, 'children' | 'className'> {
  to?: undefined
}
interface AsLink extends BaseProps, Omit<ComponentProps<typeof Link>, 'children' | 'className' | 'to'> {
  to: string
}
type ButtonProps = AsButton | AsLink

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold select-none'
const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}
const variants: Record<Variant, string> = {
  primary: 'bg-leaf-600 text-white hover:bg-leaf-700 shadow-card hover:shadow-card-hover',
  accent: 'bg-sun-500 text-earth-950 hover:bg-sun-600 shadow-card hover:shadow-card-hover',
  outline: 'bg-transparent border-2 border-leaf-600 text-leaf-700 hover:bg-leaf-50',
  'ghost-light': 'bg-transparent border-2 border-white/80 text-white hover:bg-white/10',
}
const width = (fullWidth?: boolean) => (fullWidth ? 'w-full' : 'w-auto')

export const Button = ({ children, variant = 'primary', size = 'md', className = '', fullWidth = false, icon, ...rest }: ButtonProps) => {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${width(fullWidth)} cursor-pointer transition-[background-color,color,border-color,box-shadow] duration-[200ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2 ${className}`

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const },
  }

  if ('to' in rest && rest.to !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { to, ...linkRest } = rest as AsLink
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...linkRest}>
          {children}
          {icon}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button {...motionProps} className={classes} {...(rest as ComponentProps<'button'>)}>
      {children}
      {icon}
    </motion.button>
  )
}

export default Button