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
        element: <AuthGuard />,
        children: [
          {
            path: "/",
            element: <Navigate to="/app" replace />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/app",
            element: <AppPage />,
          },
        ],
      },
    ],
  },
]);