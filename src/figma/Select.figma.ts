// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=24-63
// source=src/components/Select.jsx
// component=Select
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const value = instance.getString('Value')
const message = instance.getString('Message')
const required = instance.getBoolean('Required')

// Figma has no notion of a DOM id, so this is a best-effort slug of the label,
// not a real id from any screen. Every real usage picks its own (SettingsScreen
// uses "region", TeamMembersScreen uses "invite-role") — swap this for
// whatever the surrounding form already uses.
const fieldId = label
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const disabled = instance.getEnum('State', {
  default: false, focus: false, error: false, disabled: true,
})
const isError = instance.getEnum('State', {
  default: false, focus: false, error: true, disabled: false,
})
const hasMessage = instance.getEnum('Has Message', { true: true, false: false })

const errorProp = hasMessage && isError ? figma.code` error="${message}"` : ''
const helpProp = hasMessage && !isError ? figma.code` helpText="${message}"` : ''

export default {
  example: figma.code`<Select
  label="${label}"
  id="${fieldId}"
  value={${value ? `"${value}"` : 'value'}}
  onChange={(e) => setValue(e.target.value)}
  options={options}${required ? '\n  required' : ''}${disabled ? '\n  disabled' : ''}${errorProp}${helpProp}
/>`,
  imports: ["import { Select } from '@/components/Select.jsx'"],
  id: 'select',
  metadata: { nestable: true },
}
