import textStyles from "@/shared/typography/typography"
import CreateTaskColumnModal from "./CreateTaskColumn.Modal"
import { useModal } from "@/shared/ui/modal/useModal"
import type { TaskCategory } from "@/features/taskCategories/model/category.types"

interface CreateTaskColumnButtonProps {
  onCreated: (category: TaskCategory) => void
}

function CreateTaskColumnButton({ onCreated }: CreateTaskColumnButtonProps) {
  const {openModal} = useModal()
  return (
    <div className={`flex px-13.75 h-full items-center outline-[#AFB6B9] ${textStyles.heading.xl} text-accent3-hover bg-linear-to-r from-[#2B2C37] to-[#2B2C37]/50`}>
      <button 
      onClick={() => openModal(<CreateTaskColumnModal onCreated={onCreated}/>)}
      className="appearance-none h-full w-full">+ New Column</button>
    </div>
  )
}

export default CreateTaskColumnButton