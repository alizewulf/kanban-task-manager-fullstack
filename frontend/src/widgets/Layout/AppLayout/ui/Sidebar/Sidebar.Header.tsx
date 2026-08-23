import textStyles from "../../../../../shared/typography/typography"
import logo from '/favicon.svg'

function SidebarHeader() {
    return (
        
            <div className="flex pt-8 pl-8 items-center gap-4">
                <img src={logo} alt="logo" />
                <h1 className={textStyles.heading.xl}>kanban</h1>
            </div>
        )
}

export default SidebarHeader