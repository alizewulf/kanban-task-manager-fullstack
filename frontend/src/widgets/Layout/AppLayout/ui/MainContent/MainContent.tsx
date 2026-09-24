import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import type { Task } from "@/features/tasks/model/task.types";
import TaskDetailModal from "@/features/taskDetails";
import { useAppContext } from "@/shared/context/app.context";
import textStyles from "@/shared/typography/typography";
import { useModal } from "@/shared/ui/modal/useModal";
import type { RootState } from "@/store/store";
import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { useSelector } from "react-redux";

import { useTaskSubtasks } from "@/features/taskDetails/model/useTaskSubtasks";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

interface TaskCardProps {
  task: Task;
  taskSubtasks: Subtask[];
  isDark: boolean;
  onOpen: (task: Task) => void;
}

function TaskCard({ task, taskSubtasks, isDark, onOpen }: TaskCardProps) {
  const completedSubtasks = taskSubtasks.filter((item) => item.completed).length;

  return (
    <div
      onClick={() => onOpen(task)}
      key={task.id}
      className={`group h-22 cursor-pointer max-w-75 flex gap-2 flex-col font-bold! justify-center px-4 py-6 rounded-lg ${isDark ? "bg-white" : "bg-[#2B2C37]"}`}
    >
      <p className={`${isDark ? "text-black" : "text-white"} capitalize ${textStyles.heading.md} transition-all duration-200 group-hover:text-primary group-hover:translate-x-1`}>
        {task.title}
      </p>

      <p className={`text-accent3-hover ${textStyles.heading.md} transition-all duration-200 group-hover:text-primary group-hover:translate-x-1`}>
        {completedSubtasks} of {taskSubtasks.length} subtasks completed
      </p>
    </div>
  );
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const { categories, tasks } = useAppContext();
  const { subtasks, updateSubtasks } = useTaskSubtasks(tasks);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";
  const { openModal } = useModal();

  const handleTaskOpen = (task: Task) => {
    const nextSubtasks = subtasks[task.id] ?? [];

    openModal(
      <TaskDetailModal
        task={task}
        subtasks={nextSubtasks}
        setSubtasks={(value) => updateSubtasks(task.id, value)}
      />
    );
  };

  if (categories.length === 0) {
    return <EmptyBoardContent onCategoryCreated={onCategoryCreated} />;
  }

  return (
    <div className="flex gap-6 pt-6 pl-6">
      {categories.map((taskCategory) => (
        <div key={taskCategory.id} className="flex flex-col w-75 gap-5">
          <div className="flex gap-3 items-center h-fit">
            <span
              style={{ backgroundColor: taskCategory.color }}
              className="w-3.75 h-3.75 rounded-full"
            />
            <p className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}>
              {taskCategory.title} ({tasks[taskCategory.id]?.length ?? 0})
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {(tasks[taskCategory.id] ?? []).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                taskSubtasks={subtasks[task.id] ?? []}
                isDark={isDark}
                onOpen={handleTaskOpen}
              />
            ))}
          </div>
        </div>
      ))}

      <CreateTaskColumnButton onCreated={onCategoryCreated} />
    </div>
  );
}

export default MainContent;