import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { Header, Main, Sidebar } from "../../../widgets/Layout/AppLayout";
import Modal from "@/shared/ui/modal";
import { useEffect, useState } from "react";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import { getCategories } from "@/features/taskCategories/model/getCategories";
import MainContent from "@/widgets/Layout/AppLayout/ui/MainContent";
import { useAppContext } from "@/shared/context/app.context";

function AppPage() {
  const [data, setData] = useState<TaskCategory[]>([]);
  const { selectedColumn } = useAppContext()

  useEffect(() => {
    const loadCategories = async () => {
      if (!selectedColumn) {
        setData([]);
        return;
      }

      const categories = await getCategories(selectedColumn.id);

      setData(categories);
    };

    loadCategories();
  }, [selectedColumn]);

  return (
    <div className="flex flex-row">
      <Modal>
        <Sidebar />

        <div className="flex flex-col flex-1 max-h-screen">
          <Header />
          <Main>
            {data.length >= 1 ? (
              <MainContent data={data} />
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