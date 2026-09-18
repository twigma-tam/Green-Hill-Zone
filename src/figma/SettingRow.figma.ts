// url=<FIGMA_SETTING_ROW>
// source=src/components/SettingRow.jsx
// component=SettingRow
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const hasDescription = instance.getBoolean('Has Description')

// The ToggleSwitch inside SettingRow is an EXPOSED NESTED INSTANCE: its Checked
// and Disabled properties show up on a SettingRow instance instead of being
// re-declared on the row. They are the nested component's properties, not this
// one's, so they aren't readable from this template — and they shouldn't be
// hardcoded either, since `checked` in code is caller state that changes at
// runtime. The snippet emits the state wiring and lets the caller name it, the
// same way InputField's template emits `value={value}`.
export default {
  example: figma.code`<SettingRow
  title="${title}"${hasDescription ? figma.code`
  description="${description}"` : ''}
  checked={enabled}
  onChange={setEnabled}
/>`,
  imports: ["import { SettingRow } from '@/components/SettingRow.jsx'"],
  id: 'setting-row',
  metadata: { nestable: true },
}
