// url=<FIGMA_STATUS_BADGE>
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
