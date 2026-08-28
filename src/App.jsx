import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard.jsx'
import SettingsScreen from '@/pages/SettingsScreen.jsx'
import ReportsScreen from '@/pages/ReportsScreen.jsx'
import BillingInvoices from '@/pages/BillingInvoices.jsx'
import BillingAgingReport from '@/pages/BillingAgingReport.jsx'
import TeamMembersScreen from '@/pages/TeamMembersScreen.jsx'
import IntegrationsPage from '@/pages/IntegrationsPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billing" element={<BillingInvoices />} />
        <Route path="/billing/aging" element={<BillingAgingReport />} />
        <Route path="/team" element={<TeamMembersScreen />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
