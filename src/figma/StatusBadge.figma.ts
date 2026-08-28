// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=2-735
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
