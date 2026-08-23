import { Main, Sidebar } from "../../../widgets/Layout/AppLayout";

function AppPage() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Main />
    </div>
  )
}

export default AppPage