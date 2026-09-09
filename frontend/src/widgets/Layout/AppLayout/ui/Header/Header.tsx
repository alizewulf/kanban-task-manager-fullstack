import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import ThreeDotsIcon from "./3.Dots"
import Button from "@/shared/ui/button/Button"

function Header() {
const { selectedColumn } = useAppContext()

  return (
    <header className="flex justify-between items-center pt-5 pb-6 bg-white">
        
        <h2 className={`${textStyles.heading.xl} px-6`}>{selectedColumn?.title}</h2>

        <div className="flex gap-6 justify-end items-center pr-8">
            <Button variant="primary" disabled>+ Add New Task</Button>
            <ThreeDotsIcon/>
        </div>

    </header>
  )
}

export default Header