import { useSelector } from "react-redux"
import textStyles from "../../../../../shared/typography/typography"
import logo from '/favicon.svg'
import type { RootState } from "@/store/store"

function SidebarHeader() {
    const theme = useSelector((state: RootState) => state.theme.theme)
    const isDark = theme === "dark"
    return (

        <div className="flex pt-8 pl-8 items-center gap-4">
            <img src={logo} alt="logo" />
            <h1 className={`${textStyles.heading.xl} ${isDark ? "text-black" : "text-white"}`}>kanban</h1>
        </div>
    )
}

export default SidebarHeader