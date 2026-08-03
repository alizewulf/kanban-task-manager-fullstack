import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Layout from "./Layout";
import LoginPage from "../pages/login/ui/LoginPage";
import RegisterPage from "../pages/register/ui/RegisterPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
