import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import { useAppContext } from "@/shared/context/app.context";
import textStyles from "@/shared/typography/typography";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const { categories, tasks } = useAppContext();

  return (
    <div className="flex gap-6 pt-6 pl-6">
      {categories.map((task_category) => (
        <div
          key={task_category.id}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-3 items-center h-fit">
            <span
              style={{ backgroundColor: task_category.color }}
              className="w-3.75 h-3.75 rounded-full"
            />

            <p
              className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}
            >
              {task_category.title} ({tasks[task_category.id]?.length ?? 0})
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {tasks[task_category.id]?.map((task) => (
              <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <CreateTaskColumnButton onCreated={onCategoryCreated} />
    </div>
  );
}

export default MainContent;