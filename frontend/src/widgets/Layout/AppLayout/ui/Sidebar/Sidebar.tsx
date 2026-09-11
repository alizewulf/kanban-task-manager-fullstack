import SidebarColumns from "./Sidebar.Columns"
import SidebarHeader from "./Sidebar.Header"
import { useSelector, } from 'react-redux';
import type { RootState } from "../../../../../store/store";
import ThemeButton from "@/features/theme";
import ShowSidebarButton from "@/features/showSidebarButton";
import { useState } from "react";

function Sidebar() {
  const auth = useSelector((state:RootState) => state.auth)
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"
  const [sidebarState, setSidebarState] = useState<boolean>(true)
  
  return (
    <>
    {sidebarState? (
    <aside className={`w-1/5 flex flex-col border-r ${isDark? "border-r-accent3" : "border-r-accent2-hover"} justify-between ${isDark? "bg-white" : "bg-dark"}`}>
      <div className="flex flex-col gap-20">
        <SidebarHeader />
        {auth.user && <SidebarColumns userId={auth.user.id}/>}
      </div>

      <div className="flex flex-col pb-8">
        <div className="px-6">
        <ThemeButton/>
        <ShowSidebarButton state={sidebarState} setState={setSidebarState}/>
        </div>
      </div>
    </aside>

    ) : (
      <>
        <ShowSidebarButton state={sidebarState} setState={setSidebarState}/>
      </>
    )}

    </>
  )
}

export default Sidebar