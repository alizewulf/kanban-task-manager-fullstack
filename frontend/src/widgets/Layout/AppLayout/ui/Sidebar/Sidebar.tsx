import SidebarColumns from "./Sidebar.Columns"
import SidebarHeader from "./Sidebar.Header"

function Sidebar() {
  return (
    <aside className="w-1/5 flex flex-col justify-between">
      <div className="flex flex-col gap-20">
        <SidebarHeader />
        <SidebarColumns userId={1}/>
      </div>
    </aside>
  )
}

export default Sidebar