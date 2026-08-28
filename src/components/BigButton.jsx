/** Primary actions across the app. Variants are centralized here — screens
 *  choose a variant and, optionally, size; they don't override colors or
 *  spacing directly, so the button stays consistent everywhere it's used.
 *
 *  Interactive states are expressed as CSS custom properties set inline and
 *  consumed by `hover:` / `active:` utilities. Doing it this way keeps the
 *  variant table as the single source of colour truth while still getting real
 *  pseudo-class behaviour — an inline style object alone cannot do :hover.
 *
 *  Pressed reuses the hover fill plus a 1px downward nudge. The nudge is a
 *  physical affordance rather than a themed value, so it stays untokenised.
 */

const VARIANTS = {
  primary: {
    '--btn-bg': 'var(--brand)',
    '--btn-bg-hover': 'var(--brand-hover)',
    '--btn-fg': 'var(--on-brand)',
    '--btn-border': 'transparent',
  },
  ghost: {
    '--btn-bg': 'transparent',
    '--btn-bg-hover': 'var(--surface-hover)',
    '--btn-fg': 'var(--brand-link)',
    '--btn-border': 'var(--brand-link)',
  },
  danger: {
    '--btn-bg': 'var(--danger)',
    '--btn-bg-hover': 'var(--danger-hover)',
    '--btn-fg': 'var(--on-brand)',
    '--btn-border': 'transparent',
  },
}

const SIZES = {
  md: 'px-4 py-2 text-14',
  sm: 'px-3 py-1.5 text-13',
}

export default function BigButton({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
}) {
  const interactive = disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer hover:bg-[var(--btn-bg-hover)] active:bg-[var(--btn-bg-hover)] active:translate-y-px'

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`rounded-lg border font-semibold transition-colors ${SIZES[size]} ${interactive} bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-border)]`}
      style={{ ...VARIANTS[variant], fontFamily: 'var(--font-sans)' }}
    >
      {children}
    </button>
  )
}
