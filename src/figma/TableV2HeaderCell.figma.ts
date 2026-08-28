// url=<FIGMA_TABLE_V2_HEADER_CELL>
// source=src/components/TableV2.jsx
// component=HeaderCell
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

// Sort=off means a plain string header (not sortable). The other three are the
// same sortable header at different states — sorting is CONTROLLED, so the
// direction lives in the caller's `sort` prop, not in the cell.
const sortable = instance.getEnum('Sort', {
  off: false, idle: true, asc: true, desc: true,
})
const direction = instance.getEnum('Sort', {
  off: null, idle: null, asc: 'asc', desc: 'desc',
})

// `key` must match a real field name in the caller's row data — Figma has no
// notion of that data shape, so this is only a best-effort slug of the label.
// It happens to work for single-word labels ("Plan" -> "plan", "MRR" -> "mrr"),
// but not always: Dashboard's "Customer" column uses key "name", not "customer".
// Verify against the real data shape before using this key as-is.
export default {
  example: sortable
    ? figma.code`{/* sortable column${direction ? ` — currently sorted ${direction}` : ''}; verify \`key\` against your real data field */}
{ label: '${text}', key: '${text.toLowerCase()}' }`
    : figma.code`'${text}'`,
  imports: [],
  id: 'table-v2-header-cell',
  metadata: { nestable: true },
}
