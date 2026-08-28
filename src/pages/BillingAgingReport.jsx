import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/NavBar.jsx'
import BigButton from '@/components/BigButton.jsx'

const buckets = [
  { label: 'Current', amount: '$18,400', color: 'var(--success)' },
  { label: '1–30 days', amount: '$3,200', color: 'var(--brand-link)' },
  { label: '31–60 days', amount: '$890', color: 'var(--text-muted)' },
  { label: '61+ days', amount: '$120', color: 'var(--danger)' },
]

export default function BillingAgingReport() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <div className="mx-auto max-w-xl px-6 py-8">
        <p className="mb-3 text-14">
          <Link to="/billing" className="text-[var(--brand)] no-underline hover:underline">
            Billing
          </Link>
          <span className="text-[var(--text-muted)]"> / </span>
          <span className="text-[var(--text-secondary)]">Aging</span>
        </p>

        <h1 className="mb-2 text-24 font-bold text-[var(--text)]">Accounts receivable aging</h1>
        <p className="mb-6 text-14 text-[var(--text-secondary)]">Snapshot only — not wired to a live ledger.</p>

        <div className="flex flex-col gap-3">
          {buckets.map((b) => (
            <div
              key={b.label}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-15"
              style={{ borderLeftWidth: 4, borderLeftColor: b.color }}
            >
              <span className="font-semibold text-[var(--text)]">{b.label}</span>
              <span className="font-semibold text-[var(--text-strong)]">{b.amount}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <BigButton variant="ghost" onClick={() => navigate('/billing')}>
            ← Back to invoices
          </BigButton>
        </div>
      </div>
    </div>
  )
}
