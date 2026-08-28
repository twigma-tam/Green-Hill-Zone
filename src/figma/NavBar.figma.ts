// url=<FIGMA_NAV_BAR>
// source=src/components/NavBar.jsx
// component=NavBar
import figma from 'figma'
const instance = figma.selectedInstance

const brand = instance.getString('Brand')

// NavBar owns its link list internally (NAV_LINKS) and derives the active item
// from useLocation() — there is no prop for it, so the nav items are not
// emitted individually here.
export default {
  example: figma.code`<NavBar${brand && brand !== 'Green Hill' ? figma.code` brand="${brand}"` : ''} />`,
  imports: ["import NavBar from '@/components/NavBar.jsx'"],
  id: 'nav-bar',
  metadata: { nestable: false },
}
