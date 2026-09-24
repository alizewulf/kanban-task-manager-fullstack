import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import ThreeDotsIcon from "./3.Dots.Icon"
import Button from "@/shared/ui/button/Button"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useState } from "react"
import EditColumnButton from "@/features/editColumn"
import EditColumnModal from "@/features/editColumn/ui/EditColumn.Modal"
import { useModal } from "@/shared/ui/modal/useModal"
import DeleteColumnButton from "@/features/deleteColumn"
import DeleteColumnModal from "@/features/deleteColumn/ui/DeleteColumn.Modal"
import type { TaskCategory } from "@/features/taskCategories/model/category.types"

interface HeaderProps {
  categories: TaskCategory[]
  onCategoriesChange: (categories: TaskCategory[]) => void
}

function Header({ categories, onCategoriesChange }: HeaderProps) {
  const { selectedColumn } = useAppContext()
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"
  const [renderDropdown, setDropdown] = useState<boolean>(false)
  const { openModal } = useModal()

  function handleEditColumn() {
    openModal(
      <EditColumnModal
        categories={categories}
        onCategoriesChange={onCategoriesChange}
      />
    )
    setDropdown(false)
  }

  function handleRemoveColumn() {
    openModal(<DeleteColumnModal/>)
    setDropdown(false)
  }
  return (
    <header className={`flex justify-between border-b ${isDark? "border-b-accent3" : "border-b-accent2-hover"} items-center pt-5 pb-6 ${isDark? "bg-white" : "bg-dark"}`}>
        
        <h2 className={`${textStyles.heading.xl} ${isDark? "text-black" : "text-white"} capitalize px-6`}>{selectedColumn?.title}</h2>

        <div className="flex relative gap-6 justify-end items-center pr-8">
            <Button variant="primary" disabled>+ Add New Task</Button>
            <button className="w-10 h-10 flex items-center justify-center" onClick={() => setDropdown(prev => !prev)}><ThreeDotsIcon/></button>
            {renderDropdown && (
              <>
              <div className={`absolute py-4 top-15 right-10 flex flex-col gap-4 items-start rounded-lg ${isDark? "bg-white!": "bg-very-darkbg"}`}>
                <EditColumnButton onClick={handleEditColumn}/>
                <DeleteColumnButton onClick={handleRemoveColumn}/>
              </div>
              </>
            )}
        </div>
    </header>
  )
}

export default Header