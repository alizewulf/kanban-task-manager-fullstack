import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { Header, Main, Sidebar } from "../../../widgets/Layout/AppLayout";
import Modal from "@/shared/ui/modal";
import { useEffect, useState } from "react";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import { getCategories } from "@/features/taskCategories/model/getCategories";
import MainContent from "@/widgets/Layout/AppLayout/ui/MainContent";

function AppPage() {
  const [data, setData] = useState<TaskCategory[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories(1);

      setData(categories);
      console.log(categories)
    };

    loadCategories();
  }, []);

  return (
    <div className="flex flex-row">
      <Modal>
        <Sidebar />

        <div className="flex flex-col flex-1 max-h-screen">
          <Header />
          <Main>
            {data.length >= 1 ? (
              <MainContent data={data}/>
            ) : (
              <EmptyBoardContent />
            )}
          </Main>
        </div>
      </Modal>
    </div>
  );
}

export default AppPage;