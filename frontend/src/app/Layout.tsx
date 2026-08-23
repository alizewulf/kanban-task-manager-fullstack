import { useMatches } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import { AppProvider } from "../shared/context/app.context";

function Layout() {
  const matches = useMatches();
  const match = [...matches].reverse().find((m) => m.handle && (m.handle as any).layout);
  const layout = (match?.handle as any)?.layout ?? "app";

  return layout === "auth" ? <AuthLayout /> : <AppProvider><AppLayout /></AppProvider>;
}

export default Layout;