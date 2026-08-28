// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=2-735
// source=src/components/StatusBadge.jsx
// component=StatusBadge
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

const tone = instance.getEnum('Tone', {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
})

export default {
  example: figma.code`<StatusBadge tone="${tone}">${label}</StatusBadge>`,
  imports: ["import { StatusBadge } from '@/components/StatusBadge.jsx'"],
  id: 'status-badge',
  metadata: { nestable: true },
}
