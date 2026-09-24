import { useEffect, useState } from "react";

import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import { getSubtasks } from "@/features/subtasks/model/getSubtask";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import TaskDetailModal from "@/features/taskDetails";
import { useAppContext } from "@/shared/context/app.context";
import textStyles from "@/shared/typography/typography";
import { useModal } from "@/shared/ui/modal/useModal";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const { categories, tasks } = useAppContext();
  const [subtasks, setSubtasks] = useState<Record<number, Subtask[]>>({});
  const theme = useSelector((state: RootState) => state.theme.theme)
  const isDark = theme === "dark"
  const { openModal } = useModal()

  const handleSubtasksUpdate = (taskId: number, nextSubtasks: Subtask[]) => {
    setSubtasks((current) => ({
      ...current,
      [taskId]: nextSubtasks,
    }));
  };

  useEffect(() => {
    const taskIds = categories.flatMap((category) => (tasks[category.id] ?? []).map((task) => task.id));

    if (taskIds.length === 0) {
      setSubtasks({});
      return;
    }

    let isMounted = true;

    const loadSubtasks = async () => {
      const nextSubtasks: Record<number, Subtask[]> = {};

      await Promise.all(
        taskIds.map(async (taskId) => {
          try {
            nextSubtasks[taskId] = await getSubtasks(taskId);
          } catch {
            nextSubtasks[taskId] = [];
          }
        })
      );

      if (isMounted) {
        setSubtasks((current) => ({
          ...current,
          ...nextSubtasks,
        }));
      }
    };

    loadSubtasks();

    return () => {
      isMounted = false;
    };
  }, [categories, tasks]);

  const handleTaskOpen = (task: { id: number; title: string; description: string; category_id: number; position: number }) => {
    const nextSubtasks = subtasks[task.id] ?? [];

    openModal(
      <TaskDetailModal
        task={task}
        subtasks={nextSubtasks}
        setSubtasks={(value) => handleSubtasksUpdate(task.id, value)}
      />
    );
  };

  return (
    <div className="flex gap-6 pt-6 pl-6">
      {categories.map((task_category) => (
        <div key={task_category.id} className="flex flex-col w-75 gap-5">
          <div className="flex gap-3 items-center h-fit">

            <span style={{ backgroundColor: task_category.color }} className="w-3.75 h-3.75 rounded-full" />
            <p className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}>
              {task_category.title} ({tasks[task_category.id]?.length ?? 0})
            </p>

          </div>

          <div className="flex flex-col gap-5">

            {tasks[task_category.id]?.map((task) => {
              const taskSubtasks = subtasks[task.id];
              const hasLoadedSubtasks = Array.isArray(taskSubtasks);
              const completedSubtasks = hasLoadedSubtasks
                ? taskSubtasks.filter((item) => item.completed).length
                : 0;

              const shouldShowSubtaskSummary = hasLoadedSubtasks && taskSubtasks.length > 0;

              return (
                <div
                  onClick={() => handleTaskOpen(task)}
                  key={task.id}
                  className={`group h-22 cursor-pointer max-w-75 flex gap-2 flex-col font-bold! justify-center px-4 py-6 rounded-lg ${isDark ? "bg-white" : "bg-[#2B2C37]"}`}
                >
                  <p className={`${isDark ? "text-black" : "text-white"} capitalize ${textStyles.heading.md} transition-all duration-200 group-hover:text-primary group-hover:translate-x-1`}>
                    {task.title}
                  </p>

                  {shouldShowSubtaskSummary && (
                    <p className={`text-accent3-hover ${textStyles.heading.md} transition-all duration-200 group-hover:text-primary group-hover:translate-x-1`}>
                      {completedSubtasks} of {taskSubtasks.length} subtasks completed
                    </p>
                  )}
                </div>
              );
            })}

          </div>
        </div>

      ))}

      <CreateTaskColumnButton onCreated={onCategoryCreated} />

    </div>

  );
}

export default MainContent;