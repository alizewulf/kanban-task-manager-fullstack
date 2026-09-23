import textStyles from "@/shared/typography/typography"
import CreateTaskColumnModal from "./CreateTaskColumn.Modal"
import { useModal } from "@/shared/ui/modal/useModal"
function CreateTaskColumnButton() {
  const {openModal} = useModal()
  return (
    <div className={`flex px-13.75 h-full items-center outline-[#AFB6B9] ${textStyles.heading.xl} text-accent3-hover bg-linear-to-r from-[#2B2C37] to-[#2B2C37]/50`}>
      <button 
      onClick={() => openModal(<CreateTaskColumnModal/>)}
      className="appearance-none h-full w-full">+ New Column</button>
    </div>
  )
}

export default CreateTaskColumnButton