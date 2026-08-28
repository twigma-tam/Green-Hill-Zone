/** Simple table helper. Row data must include a stable `id` — the table
 *  keys on it, so rows stay correctly matched to their content when the
 *  list is sorted, filtered, or reordered. That guarantee is the whole reason
 *  sorting is safe to offer here.
 *
 *  `headers` accepts either a plain string (not sortable) or
 *  `{ label, key }` (sortable). Sorting is controlled: the table renders the
 *  indicator and reports intent via `onSort`, but the caller owns the order of
 *  `dataRows`. A table that sorted its own copy of the data would drift out of
 *  step with whatever the screen thinks it is showing.
 */

const ARROW = { asc: '▲', desc: '▼' }

function HeaderCell({ header, sort, onSort }) {
  const label = typeof header === 'string' ? header : header.label
  const key = typeof header === 'string' ? null : header.key
  const sortable = Boolean(key && onSort)
  const isSorted = sortable && sort?.key === key
  const direction = isSorted ? sort.direction : null

  const base =
    'border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]'

  if (!sortable) {
    return (
      <th scope="col" className={base}>
        {label}
      </th>
    )
  }

  return (
    <th scope="col" aria-sort={isSorted ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'} className={base}>
      <button
        type="button"
        onClick={() => onSort(key, direction === 'asc' ? 'desc' : 'asc')}
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-semibold text-[var(--text)] hover:text-[var(--brand)]"
      >
        {label}
        <span aria-hidden="true" className={isSorted ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]'}>
          {isSorted ? ARROW[direction] : '↕'}
        </span>
      </button>
    </th>
  )
}

export function TableV2({ headers, dataRows, sort, onSort, selectedId, onSelect }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-14">
        <thead>
          <tr className="bg-[var(--bg-alt)]">
            {headers.map((h) => (
              <HeaderCell
                key={typeof h === 'string' ? h : h.key}
                header={h}
                sort={sort}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => {
            const selected = selectedId != null && row.id === selectedId
            return (
              <tr
                key={row.id}
                aria-selected={selected || undefined}
                onClick={onSelect ? () => onSelect(row.id) : undefined}
                className={[
                  'border-b border-[var(--border)] transition-colors',
                  // Selected is a class, not an inline style. An inline style would
                  // beat the hover rule, leaving the selected row as the one row
                  // that gives no hover feedback.
                  selected ? 'bg-[var(--bg-accent)]' : '',
                  'hover:bg-[var(--surface-hover)]',
                  onSelect ? 'cursor-pointer' : '',
                ].join(' ')}
              >
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-[var(--text)]">
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
