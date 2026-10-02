import { useEffect, useRef, useState } from "react";

import { getSubtasks } from "@/features/subtasks/model/getSubtask";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import type { Task } from "@/features/tasks/model/task.types";
import { updateTaskDetails } from "@/features/taskDetails/model/updateTaskDetails";
import type { TaskDetailsSubtaskInput } from "@/features/taskDetails/model/updateTaskDetails";
import DeleteTaskModal from "@/features/deleteTask/ui/DeleteTask.Modal";
import textStyles from "@/shared/typography/typography";
import { useModal } from "@/shared/ui/modal/useModal";
import EditIcon from "./EditIcon";

interface TaskDetailsModalProps {
    task: Task;
    subtasks: Subtask[];
    setSubtasks: (subtasks: Subtask[]) => void;
    onTaskSaved: (task: Task, subtasks: Subtask[]) => void;
    onTaskDeleted?: (taskId: number) => void;
}

interface DraftSubtask extends TaskDetailsSubtaskInput {
    draftKey: string;
}

function toDraftSubtasks(subtasks: Subtask[]): DraftSubtask[] {
    return subtasks.map((subtask) => ({
        id: subtask.id,
        title: subtask.title,
        completed: subtask.completed,
        draftKey: String(subtask.id),
    }));
}

function TaskDetailModal({ task, subtasks, setSubtasks, onTaskSaved, onTaskDeleted }: TaskDetailsModalProps) {
    const [loading, setLoading] = useState(subtasks.length === 0);
    const [loadFailed, setLoadFailed] = useState(false);
    const initialSubtasks = useRef(subtasks);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [togglingSubtaskId, setTogglingSubtaskId] = useState<number | null>(null);
    const [status, setStatus] = useState("");
    const [availableSubtasks, setAvailableSubtasks] = useState(subtasks);
    const [draftTitle, setDraftTitle] = useState(task.title);
    const [draftDescription, setDraftDescription] = useState(task.description ?? "");
    const [draftSubtasks, setDraftSubtasks] = useState(() => toDraftSubtasks(subtasks));
    const { closeModal, openModal } = useModal();
    const setSubtasksRef = useRef(setSubtasks);

    useEffect(() => {
        setSubtasksRef.current = setSubtasks;
    }, [setSubtasks]);

    useEffect(() => {
        if (initialSubtasks.current.length > 0) {
            setAvailableSubtasks(initialSubtasks.current);
            setDraftSubtasks(toDraftSubtasks(initialSubtasks.current));
            setLoading(false);
            return;
        }

        let isMounted = true;

        const loadSubtasks = async () => {
            try {
                const data = await getSubtasks(task.id);

                if (isMounted) {
                    setAvailableSubtasks(data);
                    setDraftSubtasks(toDraftSubtasks(data));
                    setSubtasksRef.current(data);
                }
            } catch {
                if (isMounted) {
                    setLoadFailed(true);
                    setStatus("Unable to load subtasks. Please close and reopen this task.");
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
    }, [task.id]);

    const handleSubtaskToggle = async (subtaskId: number, completed: boolean) => {
        if (togglingSubtaskId !== null) {
            return;
        }

        const previousSubtasks = availableSubtasks;
        const nextSubtasks = previousSubtasks.map((subtask) =>
            subtask.id === subtaskId ? { ...subtask, completed } : subtask
        );

        setAvailableSubtasks(nextSubtasks);
        setTogglingSubtaskId(subtaskId);
        setStatus("");

        try {
            const updated = await updateTaskDetails(task.id, {
                title: task.title,
                description: task.description ?? "",
                subtasks: nextSubtasks.map(({ id, title, completed: isCompleted }) => ({
                    id,
                    title,
                    completed: isCompleted,
                })),
            });

            setAvailableSubtasks(updated.subtasks);
            setSubtasksRef.current(updated.subtasks);
            onTaskSaved(updated.task, updated.subtasks);
        } catch {
            setAvailableSubtasks(previousSubtasks);
            setStatus("Unable to update subtask status. Please try again.");
        } finally {
            setTogglingSubtaskId(null);
        }
    };

    const handleSave = async () => {
        if (!draftTitle.trim()) {
            setStatus("Task title is required.");
            return;
        }

        if (draftSubtasks.some((subtask) => !subtask.title.trim())) {
            setStatus("Subtask titles cannot be empty.");
            return;
        }

        setIsSaving(true);
        setStatus("");

        try {
            const updated = await updateTaskDetails(task.id, {
                title: draftTitle.trim(),
                description: draftDescription,
                subtasks: draftSubtasks.map(({ id, title, completed }) => ({
                    ...(id === undefined ? {} : { id }),
                    title: title.trim(),
                    completed,
                })),
            });

            setAvailableSubtasks(updated.subtasks);
            setSubtasks(updated.subtasks);
            onTaskSaved(updated.task, updated.subtasks);
            closeModal();
        } catch {
            setStatus("Unable to save task details. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const addSubtask = () => {
        setDraftSubtasks((current) => [
            ...current,
            { title: "", completed: false, draftKey: crypto.randomUUID() },
        ]);
    };

    const handleDeleteTask = () => {
        openModal(
            <DeleteTaskModal
                taskId={task.id}
                taskTitle={draftTitle.trim() || task.title}
                onDeleted={(deletedTaskId) => {
                    onTaskDeleted?.(deletedTaskId);
                    closeModal();
                }}
            />
        );
    };

    return (
        <div className="flex w-105 max-w-[calc(100vw-4rem)] flex-col gap-6 font-jakarta">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <span className={`${textStyles.heading.sm} uppercase tracking-[2.4px] text-accent3-hover`}>
                        Task details
                    </span>
                    {!isEditing && !loading && !loadFailed && (
                        <button
                            type="button"
                            aria-label="Edit task details"
                            title="Edit task details"
                            className="appereance-none rounded p-1 text-accent3-hover transition-colors hover:text-primary"
                            onClick={() => {
                                setDraftTitle(task.title);
                                setDraftDescription(task.description ?? "");
                                setDraftSubtasks(toDraftSubtasks(availableSubtasks));
                                setStatus("");
                                setIsEditing(true);
                            }}
                        >
                            <EditIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
                {isEditing ? (
                    <textarea
                        aria-label="Task title"
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        rows={2}
                        className={`${textStyles.heading.lg} min-h-12 resize-y rounded border border-accent3-hover bg-transparent px-3 py-2 text-inherit outline-none focus:border-primary`}
                    />
                ) : (
                    <h3 className={`${textStyles.heading.lg} text-inherit`}>{task.title}</h3>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <p className={`${textStyles.body.md} font-bold text-accent3-hover`}>Description</p>
                {isEditing ? (
                    <textarea
                        aria-label="Task description"
                        value={draftDescription}
                        onChange={(event) => setDraftDescription(event.target.value)}
                        rows={4}
                        placeholder="Add a description"
                        className={`${textStyles.body.md} min-h-24 resize-y rounded border border-accent3-hover bg-transparent px-3 py-2 text-inherit outline-none focus:border-primary`}
                    />
                ) : (
                    <p className={`${textStyles.body.md} whitespace-pre-wrap`}>
                        {task.description || "No description provided."}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <p className={`${textStyles.body.md} font-bold text-accent3-hover`}>
                    Subtasks ({isEditing ? draftSubtasks.length : availableSubtasks.length})
                </p>

                {loading ? (
                    <p className={`${textStyles.body.md} text-accent3-hover`}>Loading subtasks...</p>
                ) : isEditing ? (
                    <div className="flex flex-col gap-2">
                        {draftSubtasks.map((subtask, index) => (
                            <div key={subtask.draftKey} className="flex items-center gap-2 rounded border border-accent3-hover px-3 py-2">
                                <input
                                    type="checkbox"
                                    aria-label={`Mark subtask ${index + 1} complete`}
                                    checked={subtask.completed}
                                    onChange={(event) => setDraftSubtasks((current) => current.map((item) =>
                                        item.draftKey === subtask.draftKey
                                            ? { ...item, completed: event.target.checked }
                                            : item
                                    ))}
                                    className="h-4 w-4 shrink-0 accent-primary"
                                />
                                <input
                                    type="text"
                                    aria-label={`Subtask ${index + 1} title`}
                                    value={subtask.title}
                                    onChange={(event) => setDraftSubtasks((current) => current.map((item) =>
                                        item.draftKey === subtask.draftKey
                                            ? { ...item, title: event.target.value }
                                            : item
                                    ))}
                                    placeholder="Subtask title"
                                    className={`${textStyles.body.md} min-w-0 flex-1 rounded border border-accent3-hover bg-transparent px-2 py-1 outline-none focus:border-primary`}
                                />
                                <button
                                    type="button"
                                    aria-label={`Remove subtask ${index + 1}`}
                                    className="appereance-none px-1 text-danger hover:text-danger-hover"
                                    onClick={() => setDraftSubtasks((current) => current.filter((item) => item.draftKey !== subtask.draftKey))}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className={`${textStyles.body.md} appereance-none rounded border border-accent3-hover px-3 py-2 text-primary hover:bg-primary/10`}
                            onClick={addSubtask}
                        >
                            + Add new subtask
                        </button>
                    </div>
                ) : availableSubtasks.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {availableSubtasks.map((subtaskItem) => (
                            <div key={subtaskItem.id} className="flex items-center gap-2 rounded border border-accent3-hover px-3 py-2">
                                <input
                                    type="checkbox"
                                    aria-label={`Mark ${subtaskItem.title} ${subtaskItem.completed ? "incomplete" : "complete"}`}
                                    checked={subtaskItem.completed}
                                    disabled={togglingSubtaskId !== null}
                                    onChange={(event) => handleSubtaskToggle(subtaskItem.id, event.target.checked)}
                                    className="h-4 w-4 shrink-0 cursor-pointer accent-primary disabled:cursor-wait"
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

            {status && <p role="alert" className={`${textStyles.body.md} text-danger`}>{status}</p>}

            {isEditing && (
                <div className="flex justify-between gap-3">
                    <button
                        type="button"
                        disabled={isSaving}
                        className={`${textStyles.body.md} appereance-none rounded-[20px] border border-danger/50 px-5 py-2 font-bold text-danger hover:bg-danger/10 disabled:opacity-50`}
                        onClick={handleDeleteTask}
                    >
                        Delete Task
                    </button>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            disabled={isSaving}
                            className={`${textStyles.body.md} appereance-none rounded-[20px] border border-accent3-hover px-5 py-2 font-bold hover:bg-accent3-hover/10 disabled:opacity-50`}
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={isSaving}
                            className={`${textStyles.body.md} appereance-none rounded-[20px] bg-primary px-5 py-2 font-bold text-white hover:bg-primary-hover disabled:opacity-50`}
                            onClick={handleSave}
                        >
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskDetailModal;
