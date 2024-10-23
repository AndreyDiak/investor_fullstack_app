import { createBrowserRouter } from "react-router-dom";
import { AuthorizedLayout } from "./layouts/authorized";
import { AuthPage } from "./pages/auth";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <AuthorizedLayout />,
    children: [{}],
  },
]);
