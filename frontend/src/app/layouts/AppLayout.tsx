import { Outlet } from 'react-router';
import { Main, Sidebar } from '../../widgets/Layout/AppLayout';

export default function AppLayout() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar/>
        <Main>
          <Outlet/>
        </Main>
      </div>
    </>
  );
}
