// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=24-136
// source=src/components/TableV2.jsx
// component=TableV2
import figma from 'figma'
const instance = figma.selectedInstance

// hover is a CSS pseudo-class (hover:bg-[var(--surface-hover)]) with no prop.
// selected maps to the row id matching the caller's `selectedId`.
const selected = instance.getEnum('State', {
  default: false, hover: false, selected: true,
})

export default {
  example: figma.code`{/* a row in dataRows — keyed on a stable \`id\`, never the array index${selected ? '.\n    This row is selected: its id matches the selectedId prop.' : ''} */}
{ id: 'acc-1', cells: [/* … */] }`,
  imports: [],
  id: 'table-v2-row',
  metadata: { nestable: true },
}
