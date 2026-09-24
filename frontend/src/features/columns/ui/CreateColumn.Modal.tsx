import textStyles from "@/shared/typography/typography"
import Button from "@/shared/ui/button/Button"
import { useModal } from "@/shared/ui/modal/useModal"
import { Field, FieldArray, Formik, Form } from "formik"
import createBoardWithFields from "../model/createBoardWithFields"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { Column } from "../model/column.types"
import RemoveIcon from "./X.Icon"

interface CreateColumnModalProps {
  onCreated: (column: Column) => void
}

function CreateColumnModal({ onCreated }: CreateColumnModalProps) {
  const { closeModal } = useModal()
  const auth = useSelector((state: RootState) => state.auth)
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"

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
            const column = await createBoardWithFields(
              auth.user.id,
              value.title,
              value.fields
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
              <label htmlFor="board-title" className={`${textStyles.body.md} text-accent3-hover font-bold!`}>Name</label>
              <Field id="board-title" className={`outline outline-accent3-hover py-2 px-4 placeholder:${textStyles.body.lg} placeholder:text-black/25`} name="title" type="text" placeholder="e.g. Web Design" />
              {touched.title && errors.title && <span className="text-sm text-red-400">{errors.title}</span>}
            </div>

            <FieldArray name="fields">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  <span className={`${textStyles.body.md} text-accent3-hover font-bold!`}>Columns</span>
                  {values.fields.map((_, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Field name={`fields.${index}`} type="text" className={`px-4 py-2 outline outline-accent3-hover ${textStyles.body.lg} ${isDark? "placeholder:text-black text-black!":"placeholder:text-white! text-white"}`} placeholder="e.g. To Do" />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-3.5 h-3.5"
                      >
                        <RemoveIcon/>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className={`${textStyles.body.md} bg-white text-primary py-2 font-bold! rounded-[20px] h-10`}
                  >
                    + Add New Column
                  </button>
                </div>
              )}
            </FieldArray>

            {status && <span className="text-sm text-red-400">{status}</span>}

            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="w-full font-bold!"
            >
              {isSubmitting ? "Creating..." : "Create New Board"}
            </Button>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default CreateColumnModal