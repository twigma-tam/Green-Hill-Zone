import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import BigButton from '../components/BigButton.jsx'
import { EmptyState } from '../components/EmptyState.jsx'

export default function ReportsScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <EmptyState
        title="No reports yet"
        description="Connect a data source or import a CSV to see charts here."
        action={
          <BigButton variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </BigButton>
        }
      />
    </div>
  )
}
