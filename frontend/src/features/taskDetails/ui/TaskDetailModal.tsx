import { useEffect, useState } from "react";

import { getSubtasks } from "@/features/subtasks/model/getSubtask";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import type { Task } from "@/features/tasks/model/task.types";
import textStyles from "@/shared/typography/typography";

interface TaskDetailsModalProps {
    task: Task;
    subtasks: Subtask[];
    setSubtasks: (subtasks: Subtask[]) => void;
}

function TaskDetailModal({ task, subtasks, setSubtasks }: TaskDetailsModalProps) {
    const [loading, setLoading] = useState(subtasks.length === 0);

    useEffect(() => {
        if (subtasks.length > 0) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const loadSubtasks = async () => {
            try {
                const data = await getSubtasks(task.id);

                if (isMounted) {
                    setSubtasks(data);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadSubtasks();

        return () => {
            isMounted = false;
        };
    }, [task.id, setSubtasks, subtasks.length]);

    return (
        <div className="flex w-105 flex-col gap-6 font-jakarta">
            <div className="flex flex-col gap-3">
                <span className={`${textStyles.heading.sm} uppercase tracking-[2.4px] text-accent3-hover`}>
                    Task details
                </span>
                <h3 className={`${textStyles.heading.lg} text-inherit`}>{task.title}</h3>
            </div>

            <div className="flex flex-col gap-2">
                <p className={`${textStyles.body.md} font-bold text-accent3-hover`}>Description</p>
                <p className={`${textStyles.body.md} whitespace-pre-wrap`}>
                    {task.description || "No description provided."}
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className={`${textStyles.body.md} font-bold text-accent3-hover`}>
                    Subtasks ({subtasks.length})
                </p>

                {loading ? (
                    <p className={`${textStyles.body.md} text-accent3-hover`}>Loading subtasks...</p>
                ) : subtasks.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {subtasks.map((subtaskItem) => (
                            <div key={subtaskItem.id} className="flex items-center gap-2 rounded border border-accent3-hover px-3 py-2">
                                <span
                                    className={`h-3.5 w-3.5 rounded-full border ${subtaskItem.completed ? "bg-primary border-primary" : "border-accent3-hover bg-transparent"}`}
                                />
                                <span className={subtaskItem.completed ? "line-through text-accent3-hover" : "text-inherit"}>
                                    {subtaskItem.title}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={`${textStyles.body.md} text-accent3-hover`}>No subtasks yet.</p>
                )}
            </div>
        </div>
    );
}

export default TaskDetailModal