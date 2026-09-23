import textStyles from "@/shared/typography/typography"

function DeleteColumnButton({onClick}:{onClick:any}) {
    return (
        <button onClick={onClick} className={`px-4 ${textStyles.body.lg} text-danger`}>Delete Board</button>
    )
}

export default DeleteColumnButton