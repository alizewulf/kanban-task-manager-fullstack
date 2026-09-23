import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import Button from "@/shared/ui/button/Button"
import { useModal } from "@/shared/ui/modal/useModal"
import deleteColumn from "../model/deleteColumn"

function DeleteColumnModal() {
  const {selectedColumn} = useAppContext()
  const {closeModal} = useModal()
  
  if (!selectedColumn) {
    return
  }

  return (
    <div className="flex flex-col gap-6">
        <h3 className={`${textStyles.heading.lg} text-danger`}>Delete this board?</h3>
        <div className={`flex flex-col w-full ${textStyles.body.lg} text-accent3-hover w-1/2 h-10`}>
          Are you sure you want to delete the ‘{selectedColumn?.title}’ board?
          This action will remove all columns and tasks and cannot be reversed.
        </div>
        <div className="flex gap-3">
          <Button className="w-1/2" variant="destructive" onClick={() => {
            deleteColumn(selectedColumn.id)
            closeModal()
            }}>Delete</Button>
          <Button className="w-1/2" variant="secondary" onClick={() => closeModal()}>Cancel</Button>
        </div>
    </div>
  )
}

export default DeleteColumnModal

