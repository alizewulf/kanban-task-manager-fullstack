import AbstractIcon from "@/widgets/Layout/AppLayout/ui/Sidebar/icons/AbstractIcon"

interface ColumnButtonProps {
    color: any
    onClick: any,
}

function CreateColumnButton({ color, onClick }: ColumnButtonProps) {
    return (
        <button onClick={onClick} className="text-primary text-[15px] py-4 pl-8 capitalize cursor-pointer flex gap-4 font-bold items-center">
            <AbstractIcon fill={color.create} />
            + Create New Board
        </button>
    )
}

export default CreateColumnButton