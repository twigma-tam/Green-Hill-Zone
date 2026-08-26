/** Primary actions across the app. Variants are centralized here — screens
 *  choose a variant and, optionally, size; they don't override colors or
 *  spacing directly, so the button stays consistent everywhere it's used. */

const VARIANTS = {
  primary: {
    backgroundColor: 'var(--brand)',
    color: 'var(--on-brand)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--brand-link)',
    border: '1px solid var(--brand-link)',
  },
  danger: {
    backgroundColor: 'var(--danger)',
    color: 'var(--on-brand)',
  },
}

const SIZES = {
  md: { padding: '8px 16px', fontSize: 14 },
  sm: { padding: '6px 12px', fontSize: 13 },
}

export default function BigButton({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
}) {
  const base = {
    borderRadius: 8,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    fontFamily: 'system-ui, sans-serif',
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={{ ...base, ...SIZES[size], ...VARIANTS[variant] }}
    >
      {children}
    </button>
  )
}
