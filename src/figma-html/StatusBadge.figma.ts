// url=<FIGMA_STATUS_BADGE>
// source=web/green-hill.css
// component=gh-badge
import figma from 'figma'
const instance = figma.selectedInstance

// Second mapping for StatusBadge — see src/figma-html/BigButton.figma.ts for
// why this directory exists.
const label = instance.getString('Label')

const toneClass = instance.getEnum('Tone', {
  neutral: 'gh-badge--neutral',
  success: 'gh-badge--success',
  warning: 'gh-badge--warning',
  danger: 'gh-badge--danger',
})

export default {
  example: figma.code`<span class="gh-badge ${toneClass}">${label}</span>`,
  imports: ['<link rel="stylesheet" href="web/green-hill.css" />'],
  id: 'gh-badge',
  metadata: { nestable: true },
}
