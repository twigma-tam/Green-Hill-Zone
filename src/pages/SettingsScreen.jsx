import { useState } from 'react'
import NavBar from '@/components/NavBar.jsx'
import { InputField } from '@/components/InputField.jsx'
import { Select } from '@/components/Select.jsx'
import ToggleSwitch from '@/components/ToggleSwitch.jsx'
import BigButton from '@/components/BigButton.jsx'

export default function SettingsScreen() {
  const [workspaceName, setWorkspaceName] = useState('Green Hill Ops')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [betaFeatures, setBetaFeatures] = useState(false)
  const [region, setRegion] = useState('us-east')

  return (
    <div className="min-h-screen bg-[var(--bg-alt)]">
      <NavBar />
      <div className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-2 text-24 font-semibold text-[var(--text)]">Workspace settings</h1>
        <p className="mb-6 text-14 text-[var(--text-secondary)]">Changes apply to this environment only.</p>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <InputField
            label="Workspace name"
            id="ws-name"
            required
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="e.g. Green Hill"
            error={workspaceName.trim() ? undefined : 'Workspace name is required.'}
            helpText="Shown in the header and on exported reports."
          />

          <div className="mb-2 flex items-center gap-4">
            <div>
              <div id="notify-label" className="text-14 font-semibold text-[var(--text)]">
                Email notifications
              </div>
              <div className="mt-1 text-12 text-[var(--text-muted)]">Digest to admins</div>
            </div>
            <ToggleSwitch checked={notifyEmail} onChange={setNotifyEmail} labelledBy="notify-label" />
          </div>

          <div className="mb-5 mt-2 flex items-center gap-4">
            <div>
              <div id="beta-label" className="text-14 font-semibold text-[var(--text)]">
                Beta features
              </div>
              {/* A disabled control with no stated reason reads as a bug. Say why. */}
              <div className="mt-1 text-12 text-[var(--text-muted)]">
                {notifyEmail ? 'May be unstable' : 'Requires email notifications'}
              </div>
            </div>
            <ToggleSwitch
              checked={betaFeatures}
              onChange={setBetaFeatures}
              labelledBy="beta-label"
              disabled={!notifyEmail}
            />
          </div>

          <Select
            label="Data region"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            helpText="Where workspace data is stored at rest."
            options={[
              { value: 'us-east', label: 'US East' },
              { value: 'eu-west', label: 'EU West' },
              { value: 'apac', label: 'APAC' },
            ]}
          />

          <BigButton variant="primary" disabled={!workspaceName.trim()}>
            Save changes
          </BigButton>
        </div>
      </div>
    </div>
  )
}
