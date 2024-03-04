import { createBrowserRouter } from "react-router-dom";
import { PreviewMission } from "./component/preview-mission";
import { ProtectedRoute } from "./component/protected-route";
import { Main } from './dashboard';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/missions/:id",
    element: <ProtectedRoute><PreviewMission /></ProtectedRoute>
  }
]);