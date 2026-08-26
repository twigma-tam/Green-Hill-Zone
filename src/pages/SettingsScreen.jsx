import { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import { InputField } from '../components/InputField.jsx'
import ToggleSwitch from '../components/ToggleSwitch.jsx'
import BigButton from '../components/BigButton.jsx'

export default function SettingsScreen() {
  const [workspaceName, setWorkspaceName] = useState('Green Hill Ops')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [betaFeatures, setBetaFeatures] = useState(false)
  const [region, setRegion] = useState('us-east')

  return (
    <div className="min-h-screen bg-[var(--bg-alt)]">
      <NavBar />
      <div className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-2 text-2xl font-semibold text-[var(--text)]">Workspace settings</h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">Changes apply to this environment only.</p>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <InputField
            labelText="Workspace name"
            id="ws-name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="e.g. Green Hill"
          />

          <div className="mb-2 flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--text)]">Email notifications</div>
              <div className="mt-1 text-xs text-[var(--text-muted)]">Digest to admins</div>
            </div>
            <ToggleSwitch checked={notifyEmail} onChange={setNotifyEmail} />
          </div>

          <div className="mb-5 mt-2 flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--text)]">Beta features</div>
              <div className="mt-1 text-xs text-[var(--text-muted)]">May be unstable</div>
            </div>
            <ToggleSwitch checked={betaFeatures} onChange={setBetaFeatures} />
          </div>

          <label htmlFor="region" className="mb-2 block text-sm font-semibold text-[var(--text)]">
            Data region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mb-5 w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-strong)]"
          >
            <option value="us-east">US East</option>
            <option value="eu-west">EU West</option>
            <option value="apac">APAC</option>
          </select>

          <BigButton variant="primary" disabled={!workspaceName.trim()}>
            Save changes
          </BigButton>
        </div>
      </div>
    </div>
  )
}
