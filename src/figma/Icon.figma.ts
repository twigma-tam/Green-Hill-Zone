// url=<FIGMA_ICON>
// source=src/components/Icon.jsx
// component=Icon
import figma from 'figma'
const instance = figma.selectedInstance

// One axis, one glyph per value — the same list Icon.jsx enumerates. Mapped
// EXHAUSTIVELY: an unmapped variant returns undefined and emits `name="undefined"`.
const name = instance.getEnum('Name', {
  plus: 'plus',
  check: 'check',
  download: 'download',
  alert: 'alert',
  refresh: 'refresh',
  external: 'external',
})

// `size` and `label` have no Figma property. Size tracks the optical size of
// adjacent text rather than a token, and `label` only exists when an icon is
// the sole content of a control — neither is something Figma can decide, so
// both are left off and defaulted in code.
export default {
  example: figma.code`<Icon name="${name}" />`,
  imports: ["import { Icon } from '@/components/Icon.jsx'"],
  id: 'icon',
  metadata: { nestable: true },
}
