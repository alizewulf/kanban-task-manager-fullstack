import Button from "@/shared/ui/button/Button"

function CreateTaskButton({onClick}:{onClick: () => void}) {
    return (
        <Button variant="primary" className="font-bold!" onClick={onClick}>+ Add New Task</Button>
    )
}

export default CreateTaskButton