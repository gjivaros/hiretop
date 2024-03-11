import { Navigate } from "react-router-dom"
import { CandidateDashboard } from "./candidate/Dashboard"
import { useAppStore } from "./store/app-store"

function App() {
  const mode = useAppStore(state => state.mode)



  if (mode === 'enterprise') {
    return <Navigate to="/enterprise" />
  }

  return <CandidateDashboard />
}

export default App
