import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../Layout";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import AppPage from "../../pages/app";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/app" replace />,
        handle: { layout: 'app' },
      },
      {
        path: "/login",
        element: <LoginPage />,
        handle: { layout: 'auth' },
      },
      {
        path: "/register",
        element: <RegisterPage />,
        handle: { layout: 'auth' },
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/app",
            element: <AppPage />,
            handle: { layout: 'app' },
          },
        ],
      },
    ],
  },
]);