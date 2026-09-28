import SidebarColumns from "./Sidebar.Columns"
import SidebarHeader from "./Sidebar.Header"
import { useSelector, } from 'react-redux';
import type { RootState } from "../../../../../store/store";
import ThemeButton from "@/features/theme";
import ShowSidebarButton from "@/features/showSidebarButton";
import { useState } from "react";
import { useModal } from "@/shared/ui/modal/useModal";
import SettingsPanel from "@/features/settings";
import SettingsIcon from "./icons/SettingsIcon";

function Sidebar() {
  const auth = useSelector((state:RootState) => state.auth)
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"
  const [sidebarState, setSidebarState] = useState<boolean>(true)
  const { openModal } = useModal()
  
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
        <button
          type="button"
          onClick={() => openModal(<SettingsPanel />)}
          className={`mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-primary/10 ${isDark ? "text-black" : "text-white"}`}
        >
          <SettingsIcon className="shrink-0 flex items-center" />
          Settings
        </button>
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