import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

const NAV_LINKS = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/billing', text: 'Billing' },
  { to: '/team', text: 'Team' },
  { to: '/integrations', text: 'Integrations' },
  { to: '/reports', text: 'Reports' },
  { to: '/settings', text: 'Settings' },
]

/** Global app chrome — same links on every screen. */
export default function NavBar({ brand = 'Atlas' }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
      <Link to="/dashboard" className="no-underline">
        <div className="text-[22px] font-bold text-[var(--brand)]">{brand}</div>
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <nav className="flex flex-wrap gap-4">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[15px] font-medium text-[var(--brand-link)] no-underline hover:underline"
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
