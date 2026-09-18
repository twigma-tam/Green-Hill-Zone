/** Grid container for the metric cards on Dashboard.
 *
 *  Exists so the column count is a design decision made once, in one place,
 *  rather than a grid-template-columns string copied between screens. It is
 *  also the system's only example of a two-dimensional layout: everything else
 *  is a single-axis stack.
 *
 *  The Figma twin uses GRID auto-layout with the same three column counts, and
 *  its children carry a minimum width. Here `min-w-0` on the cell does the
 *  equivalent job from the other direction — without it a long metric title
 *  would push the column wider instead of truncating.
 *
 *  Columns collapse to one below `sm` on every setting; that's a viewport
 *  concern the grid owns, not something a caller should have to ask for.
 */

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function StatGrid({ columns = 4, children }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${COLUMNS[columns] ?? COLUMNS[4]}`}>
      {children}
    </div>
  )
}
