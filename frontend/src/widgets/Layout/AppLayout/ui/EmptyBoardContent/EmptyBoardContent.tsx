import type { TaskCategory } from "@/features/taskCategories/model/category.types"
import CreateTaskColumnModal from "@/features/createTaskColumn/ui/CreateTaskColumn.Modal"
import textStyles from "@/shared/typography/typography"
import Button from "@/shared/ui/button/Button"
import { useModal } from "@/shared/ui/modal/useModal"

interface EmptyBoardContentProps {
  onCategoryCreated: (category: TaskCategory) => void
}

function EmptyBoardContent({ onCategoryCreated }: EmptyBoardContentProps) {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col flex-1 gap-8 items-center justify-center">
        <span className={`${textStyles.heading.lg} text-accent3-hover`}>This board is empty. Create a new column to get started</span>
        <Button
          variant="primary"
          size="lg"
          onClick={() => openModal(<CreateTaskColumnModal onCreated={onCategoryCreated} />)}
        >
          + Add New Column
        </Button>
    </div>
  )
}

export default EmptyBoardContent