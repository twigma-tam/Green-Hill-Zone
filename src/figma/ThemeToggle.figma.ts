// url=<FIGMA_THEME_TOGGLE>
// source=src/components/ThemeToggle.jsx
// component=ThemeToggle
import figma from 'figma'
const instance = figma.selectedInstance

// ThemeToggle takes no props — it reads the current mode from useTheme() and
// cycles light -> dark -> 16bit -> 32bit. The Mode variant records which mode
// is showing, but there is no prop to bind it to, so it is read for
// documentation only and never emitted as an attribute.
const mode = instance.getEnum('Mode', {
  light: 'light',
  dark: 'dark',
  '16bit': '16bit',
  '32bit': '32bit',
})

export default {
  example: figma.code`{/* current mode: ${mode} — cycles on click via useTheme() */}
<ThemeToggle />`,
  imports: ["import ThemeToggle from '@/components/ThemeToggle.jsx'"],
  id: 'theme-toggle',
  metadata: { nestable: true },
}
