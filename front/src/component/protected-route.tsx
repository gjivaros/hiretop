import { Navigate } from "react-router-dom";
import { useAppStore } from "../store/app-store";

interface ProtectedRouteProps {
  children: JSX.Element
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { account } = useAppStore()

  if (!account) return <Navigate to="/" replace={true} />

  return children
}