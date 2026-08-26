/** Simple table helper. Row data must include a stable `id` — the table
 *  keys on it, so rows stay correctly matched to their content when the
 *  list is sorted, filtered, or reordered. */
export function TableV2({ headers, dataRows }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--bg-alt)]">
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--border)]">
              {row.cells.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--text)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
