import SidebarColumns from "./Sidebar.Columns"
import SidebarHeader from "./Sidebar.Header"
import { useSelector, } from 'react-redux';
import type { RootState } from "../../../../../store/store";
import ThemeButton from "@/features/theme";

function Sidebar() {
  const auth = useSelector((state:RootState) => state.auth)
  return (
    <aside className="w-1/5 flex flex-col justify-between">
      <div className="flex flex-col gap-20">
        <SidebarHeader />
        {auth.user && <SidebarColumns userId={auth.user.id}/>}
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <div className="px-6">
        <ThemeButton/>
        </div>

      </div>
    </aside>
  )
}

export default Sidebar