import { useEffect, useState } from "react";

import CreateTaskColumnButton from "@/features/createTaskColumn";

import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { Task } from "@/features/tasks/model/task.types";

import { getTasks } from "@/features/tasks/model/getTasks";

import textStyles from "@/shared/typography/typography";

interface MainContentProps {
  data: TaskCategory[];
  onCategoryCreated: (category: TaskCategory) => void;
}

function MainContent({ data, onCategoryCreated }: MainContentProps) {
  const [tasks, setTasks] = useState<Record<number, Task[]>>({});

  useEffect(() => {
    const loadTasks = async () => {
      const result: Record<number, Task[]> = {};

      for (const category of data) {
        const tasks = await getTasks(category.id);

        result[category.id] = tasks;
      }

      setTasks(result);
    };

    loadTasks();
  }, [data]);

  return (
    <div className="flex gap-6 pt-6 pl-6">
      {data.map((task_category) => (
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