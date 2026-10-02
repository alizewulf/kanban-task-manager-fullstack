import { useState } from "react";

import deleteTask from "@/features/deleteTask/model/deleteTask";
import textStyles from "@/shared/typography/typography";
import Button from "@/shared/ui/button/Button";
import { useModal } from "@/shared/ui/modal/useModal";

interface DeleteTaskModalProps {
  taskId: number;
  taskTitle: string;
  onDeleted: (taskId: number) => void;
}

function DeleteTaskModal({ taskId, taskTitle, onDeleted }: DeleteTaskModalProps) {
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await deleteTask(taskId);
      onDeleted(taskId);
      closeModal();
    } catch {
      setError("Unable to delete this task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-[24rem] max-w-[calc(100vw-4rem)] flex-col gap-6">
      <h3 className={`${textStyles.heading.lg} text-danger`}>Delete this task?</h3>

      <p className={`${textStyles.body.lg} text-accent3-hover`}>
        Are you sure you want to delete “{taskTitle}”? This action cannot be undone.
      </p>

      {error && <p className={`${textStyles.body.md} text-danger`}>{error}</p>}

      <div className="flex gap-3">
        <Button
          variant="destructive"
          className="flex-1"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Task"}
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={closeModal}
          disabled={isDeleting}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
