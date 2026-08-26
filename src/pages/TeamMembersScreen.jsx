import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import BigButton from '../components/BigButton.jsx'
import { InputField } from '../components/InputField.jsx'
import { Modal } from '../components/Modal.jsx'

const people = [
  { id: '1', name: 'Alex Rivera', role: 'Admin' },
  { id: '2', name: 'Jordan Lee', role: 'Editor' },
  { id: '3', name: 'Sam Patel', role: 'Viewer' },
  { id: '4', name: 'Riley Chen', role: 'Editor' },
]

export default function TeamMembersScreen() {
  const navigate = useNavigate()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Editor')

  const closeInvite = () => {
    setInviteOpen(false)
    setEmail('')
    setRole('Editor')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <div className="max-w-xl px-6 py-8">
        <h1 className="mb-2 text-2xl font-semibold text-[var(--text)]">Team & access</h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Invite members, then wire billing and integrations from the header nav.
        </p>

        <ul className="m-0 list-none p-0">
          {people.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 text-sm"
            >
              <span className="font-semibold text-[var(--text)]">{p.name}</span>
              <span className="text-[var(--text-secondary)]">{p.role}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <BigButton variant="ghost" onClick={() => setInviteOpen(true)}>
            Invite user
          </BigButton>
          <BigButton variant="primary" onClick={() => navigate('/billing')}>
            Open billing for seats
          </BigButton>
        </div>

        <p className="mt-6 text-sm text-[var(--text-muted)]">
          Also try the{' '}
          <Link to="/integrations" className="text-[var(--brand-link)] no-underline hover:underline">
            integrations hub
          </Link>{' '}
          for Slack notifications.
        </p>
      </div>

      <Modal
        open={inviteOpen}
        onClose={closeInvite}
        title="Invite a team member"
        footer={
          <>
            <BigButton variant="ghost" size="sm" onClick={closeInvite}>
              Cancel
            </BigButton>
            <BigButton variant="primary" size="sm" disabled={!email.trim()} onClick={closeInvite}>
              Send invite
            </BigButton>
          </>
        }
      >
        <InputField
          labelText="Email address"
          id="invite-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        <label htmlFor="invite-role" className="mb-2 block text-sm font-semibold text-[var(--text)]">
          Role
        </label>
        <select
          id="invite-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-strong)]"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </Modal>
    </div>
  )
}
