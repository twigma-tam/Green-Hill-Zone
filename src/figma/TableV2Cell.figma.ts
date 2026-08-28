// url=<FIGMA_TABLE_V2_CELL>
// source=src/components/TableV2.jsx
// component=TableV2
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
const content = instance.getEnum('Content', { Text: 'text', Badge: 'badge' })

// A Badge cell nests a StatusBadge instance — resolve it via its own template
// rather than hardcoding, so tone and label follow whatever the designer set.
let badgeCode
if (content === 'badge') {
  const badge = instance.findInstance('Badge', { traverseInstances: true })
  if (badge && badge.type === 'INSTANCE') {
    badgeCode = badge.executeTemplate().example
  }
}

export default {
  example: badgeCode ? figma.code`${badgeCode}` : figma.code`'${text}'`,
  imports: [],
  id: 'table-v2-cell',
  metadata: { nestable: true },
}
