import SidebarColumns from "./Sidebar.Columns"
import SidebarHeader from "./Sidebar.Header"
import { useSelector, } from 'react-redux';
import type { RootState } from "../../../../../store/store";
function Sidebar() {
  const auth = useSelector((state:RootState) => state.auth)
  return (
    <aside className="w-1/5 flex flex-col justify-between">
      <div className="flex flex-col gap-20">
        <SidebarHeader />
        {auth.user && <SidebarColumns userId={auth.user.id} />}
      </div>
    </aside>
  )
}

export default Sidebar