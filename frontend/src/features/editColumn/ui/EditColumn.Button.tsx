import textStyles from "@/shared/typography/typography"

function EditColumnButton({onClick}:{onClick:any}) {
    return (
        <>
            <button onClick={onClick} className={`px-4 ${textStyles.body.lg} text-accent3-hover`}>Edit Board</button>
        </>
    )
}

export default EditColumnButton