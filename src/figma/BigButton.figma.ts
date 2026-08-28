// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=23-50
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

export default {
  example: figma.code`<BigButton variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>${label}</BigButton>`,
  imports: ["import BigButton from '@/components/BigButton.jsx'"],
  id: 'big-button',
  metadata: { nestable: true },
}
