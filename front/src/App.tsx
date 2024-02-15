import EnterpriseDashboard from "./enterprise/Dashboard/EnterpriseDashboard"
import { useAppStore } from "./store/app-store"

function App() {
  const mode = useAppStore(state => state.mode)


  console.log("mode", mode)
  if (mode === 'enterprise') {
    return <EnterpriseDashboard />
  }

  return <h1>Hello</h1>
}

export default App
