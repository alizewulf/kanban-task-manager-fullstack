import { useAppContext } from "@/shared/context/app.context";
import { Main, Sidebar } from "../../../widgets/Layout/AppLayout";

function AppPage() {
  const {selectedColumn} = useAppContext()

  return (
    <div className="flex flex-row">
      <Sidebar/>
      <Main>
        {selectedColumn?.title}
      </Main>
    </div>
  )
}

export default AppPage