/** Small status pill for table rows and cards. Pick the tone that matches
 *  what the status means, not how it looks — the color follows from that. */

const TONES = {
  success: { bg: 'var(--success-bg)', fg: 'var(--success)' },
  warning: { bg: 'var(--warning-bg)', fg: 'var(--warning)' },
  danger: { bg: 'var(--danger-bg)', fg: 'var(--danger)' },
  neutral: { bg: 'var(--bg-alt)', fg: 'var(--text-secondary)' },
}

export function StatusBadge({ tone = 'neutral', children }) {
  const { bg, fg } = TONES[tone] ?? TONES.neutral

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, color: fg }}
    >
      {children}
    </span>
  )
}
