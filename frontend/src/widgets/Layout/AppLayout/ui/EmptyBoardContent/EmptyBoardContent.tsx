import textStyles from "@/shared/typography/typography"
import Button from "@/shared/ui/button/Button"

function EmptyBoardContent() {
  return (
    <div className="flex flex-col flex-1 gap-8 items-center justify-center">
        <span className={`${textStyles.heading.lg} text-accent3-hover`}>This board is empty. Create a new column to get started</span>
        <Button variant="primary" size="lg">+ Add New Column</Button>
    </div>
  )
}

export default EmptyBoardContent