import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/NavBar.jsx'
import BigButton from '@/components/BigButton.jsx'
import { InputField } from '@/components/InputField.jsx'
import { Select } from '@/components/Select.jsx'
import { Modal } from '@/components/Modal.jsx'
import { StatusBadge } from '@/components/StatusBadge.jsx'
import { PageHeader } from '@/components/PageHeader.jsx'
import { Avatar } from '@/components/Avatar.jsx'
import { Icon } from '@/components/Icon.jsx'

// Only some people have a photo — that's the point. Avatar falls back to
// initials, which is the common case in a real directory, not an error case.
const people = [
  { id: '1', name: 'Alex Rivera', role: 'Admin', photo: 'https://i.pravatar.cc/80?img=12' },
  { id: '2', name: 'Jordan Lee', role: 'Editor' },
  { id: '3', name: 'Sam Patel', role: 'Viewer', photo: 'https://i.pravatar.cc/80?img=32' },
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
      <div className="max-w-2xl px-6 py-8">
        <PageHeader
          title="Team & access"
          description="Invite members, then wire billing and integrations from the header nav."
          badge={<StatusBadge tone="neutral">{people.length} members</StatusBadge>}
          actions={
            <BigButton
              variant="ghost"
              size="sm"
              icon={<Icon name="plus" size={16} />}
              onClick={() => setInviteOpen(true)}
            >
              Invite user
            </BigButton>
          }
        />

        <ul className="m-0 list-none p-0">
          {people.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 text-14"
            >
              <span className="flex items-center gap-3">
                <Avatar name={p.name} src={p.photo} size="md" />
                <span className="font-semibold text-[var(--text)]">{p.name}</span>
              </span>
              <span className="text-[var(--text-secondary)]">{p.role}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <BigButton variant="primary" onClick={() => navigate('/billing')}>
            Open billing for seats
          </BigButton>
        </div>

        <p className="mt-6 text-14 text-[var(--text-muted)]">
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
        type="form"
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
          label="Email address"
          id="invite-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          helpText="They'll get an invite link that expires in 7 days."
        />
        <Select
          label="Role"
          id="invite-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          helpText="Editors can change data. Viewers cannot."
          options={[
            { value: 'Admin', label: 'Admin' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Viewer' },
          ]}
        />
      </Modal>
    </div>
  )
}
