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
 *
 *  `icon` is a slot, not a name. Passing `<Icon name="download" />` keeps the
 *  glyph list in one place (the Icon component) instead of duplicating it as a
 *  union type here, and it means the button never has to know how an icon is
 *  rendered. The Figma twin exposes the same thing as an INSTANCE_SWAP
 *  property whose preferred values are the Icon glyphs. The icon leads the
 *  label because it is a qualifier for the action, not a decoration after it.
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
  icon,
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-colors ${SIZES[size]} ${interactive} bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-border)]`}
      style={{ ...VARIANTS[variant], fontFamily: 'var(--font-sans)' }}
    >
      {icon}
      {children}
    </button>
  )
}
