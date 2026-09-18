// url=<FIGMA_BIG_BUTTON>
// source=web/green-hill.css
// component=gh-button
import figma from 'figma'
const instance = figma.selectedInstance

// The SECOND mapping for this Figma component. The React one lives in
// src/figma/BigButton.figma.ts and points at the same node; this one publishes
// under the "HTML" label, so Dev Mode shows both as tabs. Nothing about the
// Figma component changes — only the label and language on publish.
const label = instance.getString('Label')

const variantClass = instance.getEnum('Variant', {
  primary: 'gh-button--primary',
  ghost: 'gh-button--ghost',
  danger: 'gh-button--danger',
})

const sizeClass = instance.getEnum('Size', {
  md: '',
  sm: ' gh-button--sm',
})

const disabled = instance.getEnum('State', {
  default: false,
  hover: false,
  pressed: false,
  disabled: true,
})

// The icon is an <svg><use> reference into the shared sprite. An InstanceHandle
// has no getEnum, so the glyph name comes up through the child template's
// metadata.props — see src/figma-html/Icon.figma.ts, which is published under
// this same "HTML" label so that it resolves here.
const hasIcon = instance.getBoolean('Has Icon')
const icon = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconName
if (icon && icon.type === 'INSTANCE') {
  iconName = icon.executeTemplate().metadata?.props?.name
}

export default {
  example: figma.code`<button type="button" class="gh-button ${variantClass}${sizeClass}"${disabled ? ' disabled' : ''}>
${iconName ? figma.code`  <svg class="gh-icon" aria-hidden="true"><use href="/icons.svg#${iconName}-icon" /></svg>
` : ''}  ${label}
</button>`,
  imports: ['<link rel="stylesheet" href="web/green-hill.css" />'],
  id: 'gh-button',
  metadata: { nestable: true },
}
