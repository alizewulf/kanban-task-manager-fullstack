import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { Header, Main, Sidebar } from "../../../widgets/Layout/AppLayout";
import Modal from "@/shared/ui/modal";
import MainContent from "@/widgets/Layout/AppLayout/ui/MainContent/";
import { useAppContext } from "@/shared/context/app.context";

function AppPage() {
  const { selectedColumn, setCategories } = useAppContext();

  return (
    <div className="flex flex-row">
      <Modal>
        <Sidebar />

        <div className="flex flex-col flex-1 max-h-screen">
          <Header />
          <Main>
            {selectedColumn ? (
              <MainContent
                onCategoryCreated={(category) => setCategories((current) => [...current, category])}
              />
            ) : (
              <EmptyBoardContent
                onCategoryCreated={(category) => setCategories((current) => [...current, category])}
              />
            )}
          </Main>
        </div>
      </Modal>
    </div>
  );
}

export default AppPage;