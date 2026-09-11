import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import ThreeDotsIcon from "./3.Dots.Icon"
import Button from "@/shared/ui/button/Button"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

function Header() {
  const { selectedColumn } = useAppContext()
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"

  return (
    <header className={`flex justify-between border-b ${isDark? "border-b-accent3" : "border-b-accent2-hover"} items-center pt-5 pb-6 ${isDark? "bg-white" : "bg-dark"}`}>
        
        <h2 className={`${textStyles.heading.xl} ${isDark? "text-black" : "text-white"} capitalize px-6`}>{selectedColumn?.title}</h2>

        <div className="flex gap-6 justify-end items-center pr-8">
            <Button variant="primary" disabled>+ Add New Task</Button>
            <button className="w-10 h-10 flex items-center justify-center"><ThreeDotsIcon/></button>
        </div>

    </header>
  )
}

export default Header