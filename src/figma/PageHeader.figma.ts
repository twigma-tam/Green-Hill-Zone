// url=<FIGMA_PAGE_HEADER>
// source=src/components/PageHeader.jsx
// component=PageHeader
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')

// Has Description is a VARIANT axis (string "true"/"false"); Has Icon and
// Has Badge are real BOOLEAN properties. Read differently on purpose — this
// component is the file's reference example for the difference.
const hasDescription = instance.getEnum('Has Description', { true: true, false: false })
const hasIcon = instance.getBoolean('Has Icon')
const hasBadge = instance.getBoolean('Has Badge')

// `icon` is an INSTANCE_SWAP property, so resolve it through getInstanceSwap
// rather than by layer name — the layer name changes when the glyph is swapped,
// the property does not.
const icon = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

// `badge` is a plain nested instance with no property of its own — resolve it
// dynamically so whatever tone and label the designer set is what gets emitted.
const badge = hasBadge ? instance.findInstance('StatusBadge', { traverseInstances: true }) : null
let badgeCode
if (badge && badge.type === 'INSTANCE') {
  badgeCode = badge.executeTemplate().example
}

// `actions` is a real SLOT, so its contents are arbitrary — one button, two, or
// nothing. getSlot returns the rendered sections for whatever is in there;
// there is no instance to executeTemplate() on.
const actions = instance.getSlot('Actions')

export default {
  example: figma.code`<PageHeader
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}${iconCode ? figma.code`
  icon={${iconCode}}` : ''}${badgeCode ? figma.code`
  badge={${badgeCode}}` : ''}${actions ? figma.code`
  actions={${actions}}` : ''}
/>`,
  imports: ["import { PageHeader } from '@/components/PageHeader.jsx'"],
  id: 'page-header',
  metadata: { nestable: false },
}
