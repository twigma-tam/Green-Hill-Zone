// url=<FIGMA_BIG_BUTTON>
// source=src/components/BigButton.jsx
// component=BigButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

const variant = instance.getEnum('Variant', {
  primary: 'primary',
  ghost: 'ghost',
  danger: 'danger',
})

const size = instance.getEnum('Size', {
  md: 'md',
  sm: 'sm',
})

// State is mapped EXHAUSTIVELY. Only `disabled` has a code prop — hover and
// pressed are CSS pseudo-classes (:hover / :active) driven by --btn-bg-hover,
// so they resolve to the same output as default. Omitting them would silently
// return undefined and emit a broken snippet.
const disabled = instance.getEnum('State', {
  default: false,
  hover: false,
  pressed: false,
  disabled: true,
})

// Optional leading icon. `Icon` is an INSTANCE_SWAP property, so read it with
// getInstanceSwap rather than by layer name — the layer name changes when the
// glyph is swapped, the property does not. `Has Icon` gates it.
const hasIcon = instance.getBoolean('Has Icon')
const icon = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<BigButton variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}${iconCode ? figma.code` icon={${iconCode}}` : ''}>${label}</BigButton>`,
  imports: ["import BigButton from '@/components/BigButton.jsx'"],
  id: 'big-button',
  metadata: { nestable: true },
}
