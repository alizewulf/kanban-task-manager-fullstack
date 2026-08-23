import { useMatches } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import { AppProvider } from "../shared/context/app.context";
import { Outlet } from "react-router";

interface LayoutHandle {
  layout?: "app" | "auth";
}

function Layout() {
  const matches = useMatches();
  const match = [...matches].reverse().find((m) => (m.handle as LayoutHandle | undefined)?.layout);
  const layout = (match?.handle as LayoutHandle | undefined)?.layout ?? "app";

  return layout === "auth" ? <AuthLayout /> : <AppProvider><Outlet /></AppProvider>;
}

export default Layout;