import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import { useModal } from "@/shared/ui/modal/useModal"
import { useState } from "react"
import handleSubmit from "../model/handleSubmit"

function EditColumnModal() {
  const { selectedColumn, setSelectedColumn } = useAppContext();

  const [inputState, setInput] = useState(
    selectedColumn?.title ?? ""
  );

  const { closeModal } = useModal();

  return (
    <div className="flex flex-col gap-6">
      <h3 className={`${textStyles.heading.lg}`}>
        Edit Board
      </h3>

      <div className="flex flex-col gap-2">
        <span className={`${textStyles.body.md} font-bold text-accent3-hover`}>
          Board Name
        </span>

        <input
          type="text"
          value={inputState}
          onChange={(e) => setInput(e.target.value)}
          className="outline outline-accent3-hover"
        />

        <button
          type="button"
          onClick={async () => {
            const updatedColumn = await handleSubmit(
              inputState,
              selectedColumn!.id
            );

            setSelectedColumn(updatedColumn);
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}
export default EditColumnModal