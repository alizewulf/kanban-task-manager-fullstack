import textStyles from "@/shared/typography/typography"
import EyeIcon from "./EyeIcon"

interface SidebarButtonProps {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}


function ShowSidebarButton({ state, setState }: SidebarButtonProps) {
    return (
        <>
            {state ? (
                <button onClick={() => setState(!state)} className={`${textStyles.heading.md} text-accent3-hover flex mt-5 items-center gap-4`}>
                    <EyeIcon />
                    Hide Sidebar
                </button>
            ) : (
                <button onClick={() => setState(!state)}>Show Sidebar</button>
            )}
        </>
    )
}

export default ShowSidebarButton