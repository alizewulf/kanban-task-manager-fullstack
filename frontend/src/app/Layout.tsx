import { Outlet } from "react-router";
import Header from "../widgets/Layout/Header";

function Layout() {
  return (
    <div className="min-h-screen bg-accent4 text-accent1">
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;