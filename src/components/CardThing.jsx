/** Card for dashboard-style metrics.
 *
 *  The title truncates to a single line rather than wrapping. In a grid every
 *  card shares a row, so one wrapping title would push the whole row taller
 *  and misalign every metric beside it. `min-w-0` is what makes the truncation
 *  actually happen inside a grid cell — a grid item's default `min-width:auto`
 *  lets content win over the column. The Figma twin says the same thing as
 *  textTruncation="ENDING" with maxLines 1.
 */
export function CardThing({ title, subtext, footerNote }) {
  return (
    <div className="min-w-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
      <p className="m-0 truncate text-13 font-medium text-[var(--text-secondary)]" title={title}>
        {title}
      </p>
      <div className="mt-2 text-24 font-semibold text-[var(--text)]">{subtext}</div>
      {footerNote && <div className="mt-3 text-12 text-[var(--text-muted)]">{footerNote}</div>}
    </div>
  )
}
