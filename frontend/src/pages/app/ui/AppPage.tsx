import { useAppContext } from "@/shared/context/app.context";
import { Main, Sidebar } from "../../../widgets/Layout/AppLayout";
import Modal from "@/shared/ui/modal";

function AppPage() {
  const { selectedColumn } = useAppContext()

  return (
    <div className="flex flex-row">
      <Modal>
        <Sidebar />
        <Main>
          {selectedColumn?.title}
        </Main>
      </Modal>
    </div>
  )
}

export default AppPage