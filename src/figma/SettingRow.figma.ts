// url=<FIGMA_SETTING_ROW>
// source=src/components/SettingRow.jsx
// component=SettingRow
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const hasDescription = instance.getBoolean('Has Description')

// `Control` is a SLOT whose default content is a ToggleSwitch, and that switch
// is an EXPOSED NESTED INSTANCE. So there are two shapes to emit, and the way
// to tell them apart is to ask what is actually in the slot: if the default
// toggle is still there, this is a boolean row; if it has been replaced, the
// caller owns the control outright.
//
// This mirrors `control ?? <ToggleSwitch … />` in the component itself.
const toggle = instance.findConnectedInstance('toggle-switch', { traverseInstances: true })
const isBooleanRow = Boolean(toggle && toggle.type === 'INSTANCE')
const control = isBooleanRow ? undefined : instance.getSlot('Control')

// Checked / Disabled belong to the nested ToggleSwitch, not to this component,
// so they are not readable here — and hardcoding them would be wrong anyway,
// since `checked` in code is caller state that changes at runtime. The snippet
// emits the state wiring and lets the caller name it, the same way
// InputField's template emits `value={value}`.
export default {
  example: isBooleanRow
    ? figma.code`<SettingRow
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}
  checked={enabled}
  onChange={setEnabled}
/>`
    : figma.code`<SettingRow
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}
  control={${control}}
/>`,
  imports: ["import { SettingRow } from '@/components/SettingRow.jsx'"],
  id: 'setting-row',
  metadata: { nestable: true },
}
