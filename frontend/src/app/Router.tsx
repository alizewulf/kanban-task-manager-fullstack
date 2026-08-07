import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./Layout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);
