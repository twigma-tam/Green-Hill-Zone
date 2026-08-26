import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import { CardThing } from '../components/CardThing.jsx'
import { TableV2 } from '../components/TableV2.jsx'
import { StatusBadge } from '../components/StatusBadge.jsx'
import styles from './Dashboard.module.css'

const STATUS_TONE = { Active: 'success', 'At risk': 'warning' }

const accounts = [
  { id: 'acc-1', name: 'Northwind LLC', plan: 'Enterprise', mrr: '$4,200', status: 'Active' },
  { id: 'acc-2', name: 'Contoso', plan: 'Pro', mrr: '$890', status: 'Active' },
  { id: 'acc-3', name: 'Fabrikam', plan: 'Starter', mrr: '$120', status: 'At risk' },
  { id: 'acc-4', name: 'Adventure Co', plan: 'Pro', mrr: '$650', status: 'Active' },
  { id: 'acc-5', name: 'Tailspin Toys', plan: 'Enterprise', mrr: '$12,400', status: 'Active' },
]

const tableStuff = {
  headers: ['Customer', 'Plan', 'MRR', 'Status'],
  dataRows: accounts.map((a) => ({
    id: a.id,
    cells: [
      a.name,
      a.plan,
      a.mrr,
      <StatusBadge key="status" tone={STATUS_TONE[a.status] ?? 'neutral'}>
        {a.status}
      </StatusBadge>,
    ],
  })),
}

export default function Dashboard() {
  return (
    <div className={styles.pageWrap}>
      <NavBar />
      <main className={styles.mainArea}>
        <h1 className={styles.sectionTitle}>Overview</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Last updated 2 minutes ago · internal only</p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text)]">Other flows:</span>{' '}
          <Link to="/billing" className="font-medium text-[var(--brand)] no-underline hover:underline">
            Billing
          </Link>
          <span className="text-[var(--divider)]"> · </span>
          <Link to="/team" className="font-medium text-[var(--brand)] no-underline hover:underline">
            Team
          </Link>
          <span className="text-[var(--divider)]"> · </span>
          <Link to="/integrations" className="font-medium text-[var(--brand)] no-underline hover:underline">
            Integrations
          </Link>
        </div>

        <div className={styles.gridStats}>
          <CardThing title="Users" subtext="12,480" footerNote="+3.2% vs last week" />
          <CardThing title="Revenue" subtext="$842k" footerNote="MTD" />
          <CardThing title="Tickets" subtext="37 open" footerNote="SLA 94%" />
          <CardThing title="Uptime" subtext="99.98%" footerNote="30d rolling" />
        </div>

        <div className={styles.cardPanel}>
          <h2 className="m-0 text-[17px] font-semibold text-[var(--text)]">Recent accounts</h2>
          <p className="mb-0 mt-2 text-[13px] text-[var(--text-muted)]">Hardcoded preview data — do not use in prod</p>
          <TableV2 headers={tableStuff.headers} dataRows={tableStuff.dataRows} />
        </div>
      </main>
    </div>
  )
}
