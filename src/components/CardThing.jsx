/** Card for dashboard-style metrics. */
export function CardThing({ title, subtext, footerNote }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
      <p className="m-0 text-[13px] font-medium text-[var(--text-secondary)]">{title}</p>
      <div className="mt-2 text-2xl font-semibold text-[var(--text)]">{subtext}</div>
      {footerNote && <div className="mt-3 text-xs text-[var(--text-muted)]">{footerNote}</div>}
    </div>
  )
}
