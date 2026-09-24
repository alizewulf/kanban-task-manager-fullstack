import { useEffect, useState } from "react";

import { getSubtasks } from "@/features/subtasks/model/getSubtask";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import type { Task } from "@/features/tasks/model/task.types";

export function useTaskSubtasks(tasksByCategory: Record<number, Task[]>) {
  const [subtasks, setSubtasks] = useState<Record<number, Subtask[]>>({});

  useEffect(() => {
    const taskIds = Object.values(tasksByCategory)
      .flatMap((tasks) => tasks.map((task) => task.id));

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
  }, [tasksByCategory]);

  const updateSubtasks = (taskId: number, nextSubtasks: Subtask[]) => {
    setSubtasks((current) => ({
      ...current,
      [taskId]: nextSubtasks,
    }));
  };

  return {
    subtasks,
    updateSubtasks,
  };
}
