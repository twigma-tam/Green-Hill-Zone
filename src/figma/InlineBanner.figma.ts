// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=2-831
// source=src/components/InlineBanner.jsx
// component=InlineBanner
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const tone = instance.getEnum('Tone', {
  info: 'info', success: 'success', warning: 'warning', danger: 'danger',
})
// Has Description is a VARIANT axis (string "true"/"false");
// Has Action is a real BOOLEAN property. They are read differently on purpose.
const hasDescription = instance.getEnum('Has Description', { true: true, false: false })
const hasAction = instance.getBoolean('Has Action')

// The action is a nested BigButton instance — resolve it dynamically rather
// than hardcoding, so whatever button the designer used is what gets emitted.
const actionBtn = hasAction ? instance.findInstance('BigButton', { traverseInstances: true }) : null
let actionCode
if (actionBtn && actionBtn.type === 'INSTANCE') {
  actionCode = actionBtn.executeTemplate().example
}

export default {
  example: figma.code`<InlineBanner
  tone="${tone}"
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}${actionCode ? figma.code`
  action={${actionCode}}` : ''}
/>`,
  imports: ["import { InlineBanner } from '@/components/InlineBanner.jsx'"],
  id: 'inline-banner',
  metadata: { nestable: true },
}
