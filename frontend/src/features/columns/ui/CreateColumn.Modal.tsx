import textStyles from "@/shared/typography/typography"
import { useModal } from "@/shared/ui/modal/useModal"
import { Field, FieldArray, Formik, Form } from "formik"
import createColumn from "../model/createColumn"
import createTaskCategory from "@/features/createTaskColumn/model/createTaskCategory"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { Column } from "../model/column.types"

interface CreateColumnModalProps {
  onCreated: (column: Column) => void
}

function CreateColumnModal({ onCreated }: CreateColumnModalProps) {
  const { closeModal } = useModal()
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h2 className={`${textStyles.heading.lg} text-inherit`}>Add New Board</h2>

      <Formik
        initialValues={{
          title: "",
          fields: [""],
        }}
        validate={(values) => {
          const errors: { title?: string } = {}

          if (!values.title.trim()) {
            errors.title = "Board name is required"
          }

          return errors
        }}
        onSubmit={async (value, { setStatus }) => {
          if (!auth.user) {
            setStatus("You must be logged in to create a board")
            return
          }

          try {
            const column = await createColumn(auth.user.id, value.title.trim())
            await Promise.all(
              value.fields
                .filter((field) => field.trim())
                .map((field) => createTaskCategory(column.id, field.trim()))
            )
            onCreated(column)
            closeModal()
          } catch {
            setStatus("Unable to create board and field")
          }
        }}
      >
        {({ errors, touched, status, isSubmitting, values }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex gap-2 flex-col">
              <label htmlFor="board-title" className={`${textStyles.body.md} text-accent3-hover font-bold`}>Board Name</label>
              <Field id="board-title" name="title" type="text" placeholder="e.g. Web Design" />
              {touched.title && errors.title && <span className="text-sm text-red-400">{errors.title}</span>}
            </div>

            <FieldArray name="fields">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  <span className={`${textStyles.body.md} text-accent3-hover font-bold`}>Fields</span>
                  {values.fields.map((_, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Field name={`fields.${index}`} type="text" placeholder="e.g. To Do" />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-sm text-red-400 hover:text-red-300 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className={`${textStyles.body.md} text-primary hover:text-primary-hover font-bold self-start`}
                  >
                    + Add Field
                  </button>
                </div>
              )}
            </FieldArray>

            {status && <span className="text-sm text-red-400">{status}</span>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${textStyles.body.lg} text-white font-bold leading-5.75 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 rounded-[20px]`}
            >
              {isSubmitting ? "Creating..." : "Create New Board"}
            </button>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default CreateColumnModal