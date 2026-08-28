// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=24-136
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
