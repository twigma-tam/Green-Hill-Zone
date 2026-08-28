// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=23-138
// source=src/components/ToggleSwitch.jsx
// component=ToggleSwitch
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('Checked', { true: true, false: false })
const disabled = instance.getEnum('Disabled', { true: true, false: false })

// The design-system atom has no caption text of its own — real screens always
// pair it with a separate visible label and connect the two via `labelledBy`
// (see SettingsScreen: id="notify-label" / id="beta-label"). That id isn't
// something Figma can produce, so the standalone example here uses the
// self-contained `label` prop (a plain aria-label) instead — it's valid on
// its own with no assumed sibling element. Swap to `labelledBy="<id-of-your-label>"`
// when composing next to a visible label, as every real usage does.
export default {
  example: figma.code`<ToggleSwitch checked={${checked}} onChange={setValue}${disabled ? ' disabled' : ''} label="Toggle" />`,
  imports: ["import ToggleSwitch from '@/components/ToggleSwitch.jsx'"],
  id: 'toggle-switch',
  metadata: { nestable: true },
}
