// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=4-26
// source=src/components/EmptyState.jsx
// component=EmptyState
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const hasDescription = instance.getEnum('Has Description', { true: true, false: false })
const hasAction = instance.getEnum('Has Action', { true: true, false: false })

const actionBtn = hasAction ? instance.findInstance('BigButton', { traverseInstances: true }) : null
let actionCode
if (actionBtn && actionBtn.type === 'INSTANCE') {
  actionCode = actionBtn.executeTemplate().example
}

export default {
  example: figma.code`<EmptyState
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}${actionCode ? figma.code`
  action={${actionCode}}` : ''}
/>`,
  imports: ["import { EmptyState } from '@/components/EmptyState.jsx'"],
  id: 'empty-state',
  metadata: { nestable: false },
}
