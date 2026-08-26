import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import { TableV2 } from '../components/TableV2.jsx'
import { StatusBadge } from '../components/StatusBadge.jsx'
import BigButton from '../components/BigButton.jsx'
import { Modal } from '../components/Modal.jsx'

const STATUS_TONE = { Paid: 'success', Overdue: 'danger' }

const invoices = [
  { id: 'INV-2401', customer: 'Emerald Hill Trading Co.', amount: '$4,200', status: 'Paid' },
  { id: 'INV-2402', customer: 'Marble Works Manufacturing', amount: '$890', status: 'Paid' },
  { id: 'INV-2403', customer: 'Casino Night Holdings', amount: '$120', status: 'Overdue' },
]

const invoiceRows = {
  headers: ['Invoice', 'Customer', 'Amount', 'Status'],
  dataRows: invoices.map((inv) => ({
    id: inv.id,
    cells: [
      inv.id,
      inv.customer,
      inv.amount,
      <StatusBadge key="status" tone={STATUS_TONE[inv.status] ?? 'neutral'}>
        {inv.status}
      </StatusBadge>,
    ],
  })),
}

const overdueInvoice = invoices.find((inv) => inv.status === 'Overdue')

export default function BillingInvoices() {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-2 text-2xl font-bold text-[var(--text)]">Billing & invoices</h1>
        <p className="mb-4 text-sm text-[var(--text-secondary)]">
          Finance flow — split charges by team or push totals to your ERP.
        </p>

        <p className="mb-4 text-sm">
          <Link to="/billing/aging" className="font-semibold text-[var(--brand)] no-underline hover:underline">
            Open AR aging report →
          </Link>
        </p>

        <div className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[15px] font-semibold text-[var(--text)]">Open invoices</span>
            <BigButton variant="primary" size="sm" onClick={() => setConfirmOpen(true)}>
              Record payment
            </BigButton>
          </div>
          <TableV2 headers={invoiceRows.headers} dataRows={invoiceRows.dataRows} />
        </div>

        <p className="text-sm text-[var(--text-muted)]">
          Next:{' '}
          <Link to="/team" className="text-[var(--brand)] no-underline hover:underline">
            assign cost centers by team
          </Link>
          {' · '}
          <Link to="/integrations" className="text-[var(--brand)] no-underline hover:underline">
            connect QuickBooks
          </Link>
        </p>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Record a manual payment?"
        footer={
          <>
            <BigButton variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
              Cancel
            </BigButton>
            <BigButton variant="primary" size="sm" onClick={() => setConfirmOpen(false)}>
              Confirm payment
            </BigButton>
          </>
        }
      >
        {overdueInvoice
          ? `This marks ${overdueInvoice.id} (${overdueInvoice.customer}, ${overdueInvoice.amount}) as paid. This can't be undone automatically.`
          : "This marks the selected invoice as paid. This can't be undone automatically."}
      </Modal>
    </div>
  )
}
