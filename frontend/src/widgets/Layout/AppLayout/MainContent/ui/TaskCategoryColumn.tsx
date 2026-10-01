import { Fragment } from "react";

import { TaskCard } from "@/features/tasks";
import type { Task } from "@/features/tasks/model/task.types";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { TaskBoardModel } from "../model/useTaskBoard";
import textStyles from "@/shared/typography/typography";

interface TaskCategoryColumnProps {
  board: TaskBoardModel;
  category: TaskCategory;
  tasks: Task[];
}

function TaskCategoryColumn({ board, category, tasks }: TaskCategoryColumnProps) {
  const isDropTarget = board.dropIndicator?.categoryId === category.id;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-75 flex-col gap-5">
      <div className="flex h-fit items-center gap-3">
        <span
          style={{ backgroundColor: category.color }}
          className="h-3.75 w-3.75 rounded-full"
        />
        <p className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}>
          {category.title} ({tasks.length})
        </p>
      </div>

      <div
        onDragOver={(event) => board.onDragOverCategory(category.id, event)}
        onDrop={(event) => board.onDropOnCategory(category.id, event)}
        className={`flex flex-1 flex-col gap-5 rounded-lg transition-colors ${isDropTarget && board.dropIndicator?.beforeTaskId === null ? "bg-primary/10 outline-2 outline-dashed outline-primary" : ""}`}
      >
        {tasks.map((task) => {
          const isDropBefore = isDropTarget && board.dropIndicator?.beforeTaskId === task.id;
          const taskSubtasks = board.subtasks[task.id] ?? [];

          return (
            <Fragment key={task.id}>
              {isDropBefore && board.draggingTaskId !== null && (
                <div
                  role="status"
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onDrop={(event) => board.onDropAtPosition(category.id, task.id, event)}
                  className="flex h-22 max-w-75 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10 text-sm font-semibold text-primary"
                >
                  Drop here
                </div>
              )}
              <TaskCard
                task={task}
                completedSubtasks={taskSubtasks.filter((subtask) => subtask.completed).length}
                subtaskCount={taskSubtasks.length}
                isDark={board.isDark}
                isDragging={board.draggingTaskId === task.id}
                onOpen={board.onOpenTask}
                onDragStart={board.onDragStart}
                onDragOver={board.onDragOverTask}
                onDrop={board.onDropOnTask}
                onDragEnd={board.onDragEnd}
              />
            </Fragment>
          );
        })}
        {isDropTarget && board.dropIndicator?.beforeTaskId === null && board.draggingTaskId !== null && (
          <div
            role="status"
            onDragOver={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onDrop={(event) => board.onDropAtPosition(category.id, null, event)}
            className="flex h-22 max-w-75 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10 text-sm font-semibold text-primary"
          >
            Drop here
          </div>
        )}
        {board.isMoving && board.draggingTaskId !== null && (
          <p className="px-3 py-2 text-xs text-accent3-hover">Moving task...</p>
        )}
      </div>
    </div>
  );
}

export default TaskCategoryColumn;
