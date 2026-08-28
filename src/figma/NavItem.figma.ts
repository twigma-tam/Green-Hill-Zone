// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=13-11
// source=src/components/NavBar.jsx
// component=NavItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const active = instance.getEnum('Active', { true: true, false: false })

// `active` is a real prop: NavBar computes it from the route and passes it down,
// which is what keeps NavItem presentational and testable in isolation.

// `to` has no Figma property either — every real route in NAV_LINKS is just
// the label lowercased with a leading slash ("Dashboard" -> "/dashboard",
// "Team" -> "/team", etc.), so that's reproduced here instead of hardcoding
// one route for every instance.
const to = `/${label.trim().toLowerCase().replace(/\s+/g, '-')}`

export default {
  example: figma.code`<NavItem to="${to}"${active ? ' active' : ''}>${label}</NavItem>`,
  imports: ["import { NavItem } from '@/components/NavBar.jsx'"],
  id: 'nav-item',
  metadata: { nestable: true },
}
