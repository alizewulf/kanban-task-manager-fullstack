import { Header, Main, Sidebar } from "../../../widgets/Layout/AppLayout";
import Modal from "@/shared/ui/modal";


function AppPage() {

  return (
    <div className="flex flex-row">
      <Modal>
        <Sidebar />
        <div className="flex flex-col flex-1">
        <Header/>
        <Main>

        </Main>
        </div>
      </Modal>
    </div>
  )
}

export default AppPage