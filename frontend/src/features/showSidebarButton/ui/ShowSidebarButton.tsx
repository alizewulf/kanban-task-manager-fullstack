import textStyles from "@/shared/typography/typography"
import EyeIconDark from "./EyeIconDark"
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
                    <EyeIconDark />
                    Hide Sidebar
                </button>
            ) : (
                <button className="p-5 bg-primary absolute rounded-r-full bottom-8" onClick={() => setState(!state)}><EyeIcon/></button>
            )}
        </>
    )
}

export default ShowSidebarButton