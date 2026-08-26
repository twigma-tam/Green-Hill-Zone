/** Placeholder for a screen or section with no data yet. An empty state is
 *  an invitation to act — name the one thing that would fill it. */
export function EmptyState({ title, description, action }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-12 text-center">
      <div className="mx-auto flex h-44 max-w-md items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--bg-alt)] text-sm text-[var(--text-muted)]">
        illustration placeholder
      </div>
      <h2 className="mb-3 mt-7 text-2xl font-semibold text-[var(--text)]">{title}</h2>
      {description && (
        <p className="mb-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">{description}</p>
      )}
      {action}
    </div>
  )
}
