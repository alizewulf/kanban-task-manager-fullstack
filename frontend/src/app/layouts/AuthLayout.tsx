import { Outlet } from 'react-router';
import { Main } from '../../widgets/Layout/AuthLayout';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-accent4 text-accent1">
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
