import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar.jsx'
import { CardThing } from '@/components/CardThing.jsx'
import { TableV2 } from '@/components/TableV2.jsx'
import { StatusBadge } from '@/components/StatusBadge.jsx'
import styles from './Dashboard.module.css'

const STATUS_TONE = { Active: 'success', 'At risk': 'warning' }

const accounts = [
  { id: 'acc-1', name: 'Emerald Hill Trading Co.', plan: 'Enterprise', mrr: '$4,200', status: 'Active' },
  { id: 'acc-2', name: 'Marble Works Manufacturing', plan: 'Pro', mrr: '$890', status: 'Active' },
  { id: 'acc-3', name: 'Casino Night Holdings', plan: 'Starter', mrr: '$120', status: 'At risk' },
  { id: 'acc-4', name: 'Chemical Plant Logistics', plan: 'Pro', mrr: '$650', status: 'Active' },
  { id: 'acc-5', name: 'Starlight Freight', plan: 'Enterprise', mrr: '$12,400', status: 'Active' },
]

// MRR is stored as a display string, so sorting needs the underlying number.
const MRR_VALUE = { 'acc-1': 4200, 'acc-2': 890, 'acc-3': 120, 'acc-4': 650, 'acc-5': 12400 }

const HEADERS = [
  { label: 'Customer', key: 'name' },
  { label: 'Plan', key: 'plan' },
  { label: 'MRR', key: 'mrr' },
  { label: 'Status', key: 'status' },
]

function sortAccounts(rows, sort) {
  if (!sort) return rows
  const dir = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    if (sort.key === 'mrr') return (MRR_VALUE[a.id] - MRR_VALUE[b.id]) * dir
    return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir
  })
}

export default function Dashboard() {
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' })
  const [selectedId, setSelectedId] = useState(null)

  const dataRows = sortAccounts(accounts, sort).map((a) => ({
    id: a.id,
    cells: [
      a.name,
      a.plan,
      a.mrr,
      <StatusBadge key="status" tone={STATUS_TONE[a.status] ?? 'neutral'}>
        {a.status}
      </StatusBadge>,
    ],
  }))

  return (
    <div className={styles.pageWrap}>
      <NavBar />
      <main className={styles.mainArea}>
        <h1 className={styles.sectionTitle}>Overview</h1>
        <p className="mt-2 text-14 text-[var(--text-secondary)]">Last updated 2 minutes ago · internal only</p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-14 text-[var(--text-secondary)]">
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
          <h2 className="m-0 text-17 font-semibold text-[var(--text)]">Recent accounts</h2>
          <p className="mb-0 mt-2 text-13 text-[var(--text-muted)]">Hardcoded preview data — do not use in prod</p>
          <TableV2
            headers={HEADERS}
            dataRows={dataRows}
            sort={sort}
            onSort={(key, direction) => setSort({ key, direction })}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </main>
    </div>
  )
}
