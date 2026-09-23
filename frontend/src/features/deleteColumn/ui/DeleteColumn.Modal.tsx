import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import Button from "@/shared/ui/button/Button"
import { useModal } from "@/shared/ui/modal/useModal"

function DeleteColumnModal() {
  const {selectedColumn} = useAppContext()
  const {closeModal} = useModal()
  return (
    <div className="flex flex-col gap-6">
        <h3 className={`${textStyles.heading.lg} text-danger`}>Delete this board?</h3>
        <div className="flex flex-col w-full">
          <span>Are you sure you want to delete the ‘{selectedColumn?.title}’ board?</span>
          <span>This action will remove all columns and tasks and cannot be reversed.</span>
        </div>
        <div className="flex gap-3">
          <Button className="w-1/2" variant="destructive">Delete</Button>
          <Button className="w-1/2" variant="secondary" onClick={() => closeModal()}>Cancel</Button>
        </div>
    </div>
  )
}

export default DeleteColumnModal

