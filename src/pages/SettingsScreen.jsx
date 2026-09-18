import { useState } from 'react'
import NavBar from '@/components/NavBar.jsx'
import { InputField } from '@/components/InputField.jsx'
import { Select } from '@/components/Select.jsx'
import BigButton from '@/components/BigButton.jsx'
import { PageHeader } from '@/components/PageHeader.jsx'
import { SettingRow } from '@/components/SettingRow.jsx'
import { Icon } from '@/components/Icon.jsx'

export default function SettingsScreen() {
  const [workspaceName, setWorkspaceName] = useState('Green Hill Ops')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [betaFeatures, setBetaFeatures] = useState(false)
  const [region, setRegion] = useState('us-east')

  return (
    <div className="min-h-screen bg-[var(--bg-alt)]">
      <NavBar />
      <div className="mx-auto max-w-2xl px-6 py-8">
        <PageHeader
          title="Workspace settings"
          description="Changes apply to this environment only."
        />

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

          {/* SettingRow owns the ToggleSwitch and the label/control wiring, so
              these rows can't be assembled with the two disconnected. */}
          <div className="mb-5 divide-y divide-[var(--border)]">
            <SettingRow
              title="Email notifications"
              description="Digest to admins"
              checked={notifyEmail}
              onChange={setNotifyEmail}
            />

            {/* A disabled control with no stated reason reads as a bug. Say why. */}
            <SettingRow
              title="Beta features"
              description={notifyEmail ? 'May be unstable' : 'Requires email notifications'}
              checked={betaFeatures}
              onChange={setBetaFeatures}
              disabled={!notifyEmail}
            />

            {/* `control` is the slot: this row hosts a button instead of a switch. */}
            <SettingRow
              title="Export workspace data"
              description="Downloads a JSON archive of this environment."
              control={
                <BigButton variant="ghost" size="sm" icon={<Icon name="download" size={16} />}>
                  Export
                </BigButton>
              }
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
