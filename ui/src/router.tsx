import { createBrowserRouter } from "react-router-dom";
import { AuthorizedLayout } from "./layouts/authorized";
import { AuthPage } from "./pages/auth";
import { MenuPage } from "./pages/menu";
import { NewGamePage } from "./pages/new";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <AuthorizedLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <MenuPage />,
      },
      {
        path: "/new",
        element: <NewGamePage />,
      },
    ],
  },
]);
