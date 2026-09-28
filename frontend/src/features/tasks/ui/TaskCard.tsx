import type { DragEvent } from "react";

import type { Task } from "@/features/tasks/model/task.types";
import textStyles from "@/shared/typography/typography";

interface TaskCardProps {
  task: Task;
  completedSubtasks: number;
  subtaskCount: number;
  isDark: boolean;
  isDragging: boolean;
  onOpen: (task: Task) => void;
  onDragStart: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDrop: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

function TaskCard({
  task,
  completedSubtasks,
  subtaskCount,
  isDark,
  isDragging,
  onOpen,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TaskCardProps) {
  return (
    <div
      draggable
      data-task-id={task.id}
      onClick={() => onOpen(task)}
      onDragStart={(event) => onDragStart(task, event)}
      onDragOver={(event) => onDragOver(task, event)}
      onDrop={(event) => onDrop(task, event)}
      onDragEnd={onDragEnd}
      className={`group h-22 max-w-75 flex cursor-pointer touch-none flex-col justify-center gap-2 rounded-lg px-4 py-6 font-bold! active:cursor-grabbing ${isDark ? "bg-white" : "bg-[#2B2C37]"} ${isDragging ? "opacity-45" : ""}`}
    >
      <p className={`${isDark ? "text-black" : "text-white"} capitalize ${textStyles.heading.md} transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary`}>
        {task.title}
      </p>

      <p className={`${textStyles.heading.md} text-accent3-hover transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary`}>
        {completedSubtasks} of {subtaskCount} subtasks completed
      </p>
    </div>
  );
}

export default TaskCard;
