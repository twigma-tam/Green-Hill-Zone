import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle.jsx'

const NAV_LINKS = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/billing', text: 'Billing' },
  { to: '/team', text: 'Team' },
  { to: '/integrations', text: 'Integrations' },
  { to: '/reports', text: 'Reports' },
  { to: '/settings', text: 'Settings' },
]

/**
 * A single item in the global nav.
 *
 * `active` is a plain prop rather than something NavItem works out for itself.
 * That keeps the item presentational — it can be rendered in isolation, in a
 * test, or in a design tool without a router in scope — and it gives the design
 * system a real property to map onto. NavBar owns the routing knowledge and
 * passes the answer down.
 *
 * The active item is marked with aria-current="page", which is what assistive
 * tech actually announces; the colour and underline are the visual echo of it.
 */
export function NavItem({ to, active = false, children }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className="pb-0.5 text-15 no-underline hover:underline"
      style={{
        color: active ? 'var(--brand)' : 'var(--brand-link)',
        fontWeight: active ? 'var(--font-weight-700)' : 'var(--font-weight-500)',
        borderBottom: `2px solid ${active ? 'var(--brand)' : 'transparent'}`,
      }}
    >
      {children}
    </Link>
  )
}

/**
 * Global app chrome — same links on every screen.
 *
 * A link counts as active for its own route and for anything nested beneath it,
 * so /billing/aging keeps "Billing" lit rather than leaving the nav looking
 * like the user has wandered off the map.
 */
export default function NavBar({ brand = 'Green Hill' }) {
  const { pathname } = useLocation()
  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`)

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
      <Link to="/dashboard" className="no-underline">
        <div className="text-22 font-bold text-[var(--brand)]">{brand}</div>
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <nav className="flex flex-wrap gap-4">
          {NAV_LINKS.map((item) => (
            <NavItem key={item.to} to={item.to} active={isActive(item.to)}>
              {item.text}
            </NavItem>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
