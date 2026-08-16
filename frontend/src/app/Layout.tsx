import { useMatches } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

function Layout() {
  const matches = useMatches();
  const match = [...matches].reverse().find((m) => m.handle && (m.handle as any).layout);
  const layout = (match?.handle as any)?.layout ?? "app";

  return layout === "auth" ? <AuthLayout /> : <AppLayout />;
}

export default Layout;