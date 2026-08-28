// url=<FIGMA_INPUT_FIELD>
// source=src/components/InputField.jsx
// component=InputField
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const value = instance.getString('Value')
const message = instance.getString('Message')
const required = instance.getBoolean('Required')

// Figma has no notion of a DOM id, so this is a best-effort slug of the label,
// not a real id from any screen. Every real usage picks its own (SettingsScreen
// uses "ws-name", TeamMembersScreen uses "invite-email") — swap this for
// whatever the surrounding form already uses.
const fieldId = label
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

// State is EXHAUSTIVE. focus has no code prop — it is the focus:ring-2
// pseudo-class using the shared Focus Ring effect style — so it resolves to the
// same output as default.
const disabled = instance.getEnum('State', {
  default: false, focus: false, error: false, disabled: true,
})
const isError = instance.getEnum('State', {
  default: false, focus: false, error: true, disabled: false,
})
const hasMessage = instance.getEnum('Has Message', { true: true, false: false })

// One message slot: it renders `error` when invalid, otherwise `helpText`.
const errorProp = hasMessage && isError ? figma.code` error="${message}"` : ''
const helpProp = hasMessage && !isError ? figma.code` helpText="${message}"` : ''

export default {
  example: figma.code`<InputField
  label="${label}"
  id="${fieldId}"
  value={${value ? `"${value}"` : 'value'}}
  onChange={(e) => setValue(e.target.value)}${required ? '\n  required' : ''}${disabled ? '\n  disabled' : ''}${errorProp}${helpProp}
/>`,
  imports: ["import { InputField } from '@/components/InputField.jsx'"],
  id: 'input-field',
  metadata: { nestable: true },
}
