// url=<FIGMA_STAT_GRID>
// source=src/components/StatGrid.jsx
// component=StatGrid
import figma from 'figma'
const instance = figma.selectedInstance

// EXHAUSTIVE: Columns=1 was added to the component after this template was
// first written, and an unmapped variant silently returns undefined — which
// would have emitted `columns={undefined}`. Every axis value gets a mapping.
const columns = instance.getEnum('Columns', { 1: '1', 2: '2', 3: '3', 4: '4' })

// The cards are real nested instances, so resolve each one through its own
// template rather than hardcoding CardThing calls. There is no `.map().join()`
// here on purpose: executeTemplate() returns ResultSection[], and joining
// those produces "[object Object]". Each child gets its own variable and is
// interpolated separately.
const cards = instance.findConnectedInstances(
  (n) => n.codeConnectId() === 'card-thing',
  { traverseInstances: true }
)
const card1 = cards[0] && cards[0].type === 'INSTANCE' ? cards[0].executeTemplate().example : undefined
const card2 = cards[1] && cards[1].type === 'INSTANCE' ? cards[1].executeTemplate().example : undefined
const card3 = cards[2] && cards[2].type === 'INSTANCE' ? cards[2].executeTemplate().example : undefined
const card4 = cards[3] && cards[3].type === 'INSTANCE' ? cards[3].executeTemplate().example : undefined

// Each card gets its own line. Interpolating a missing card would otherwise
// leave a blank line, so the newline travels with the card, not around it.
const line1 = card1 ? figma.code`
  ${card1}` : ''
const line2 = card2 ? figma.code`
  ${card2}` : ''
const line3 = card3 ? figma.code`
  ${card3}` : ''
const line4 = card4 ? figma.code`
  ${card4}` : ''

export default {
  example: figma.code`<StatGrid columns={${columns}}>${line1}${line2}${line3}${line4}
</StatGrid>`,
  imports: ["import { StatGrid } from '@/components/StatGrid.jsx'"],
  id: 'stat-grid',
  metadata: { nestable: false },
}
