/** Inline message for a screen or section — a failed sync, a missing
 *  permission, a heads-up. Say what happened and what to do next; the
 *  banner never apologizes, it just states the fact. */

const TONES = {
  info: { bg: 'var(--bg-accent)', border: 'var(--brand-link)', fg: 'var(--text)' },
  success: { bg: 'var(--success-bg)', border: 'var(--success)', fg: 'var(--text)' },
  warning: { bg: 'var(--warning-bg)', border: 'var(--warning)', fg: 'var(--text)' },
  danger: { bg: 'var(--danger-bg)', border: 'var(--danger)', fg: 'var(--text)' },
}

export function InlineBanner({ tone = 'info', title, description, action }) {
  const { bg, border, fg } = TONES[tone] ?? TONES.info

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-l-4 p-4"
      style={{ backgroundColor: bg, borderLeftColor: border, color: fg }}
    >
      <div>
        <p className="m-0 text-sm font-semibold">{title}</p>
        {description && <p className="m-0 mt-1 text-sm text-[var(--text-secondary)]">{description}</p>}
      </div>
      {action}
    </div>
  )
}
