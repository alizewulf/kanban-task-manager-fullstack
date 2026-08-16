import { Outlet } from 'react-router';
import { Header, Main } from '../../widgets/Layout/AppLayout';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-accent4 text-accent1">
      <Header />
      <div className="flex">
        {/* Sidebar placeholder */}
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}
