import { Field, FieldArray, Form, Formik } from "formik"

import type { TaskCategory } from "@/features/taskCategories/model/category.types"
import createTaskCategory from "@/features/createTaskColumn/model/createTaskCategory"
import deleteCategory from "@/features/taskCategories/model/deleteCategory"
import updateCategory from "@/features/taskCategories/model/updateCategory"
import Button from "@/shared/ui/button/Button"
import textStyles from "@/shared/typography/typography"
import { useAppContext } from "@/shared/context/app.context"
import { useModal } from "@/shared/ui/modal/useModal"
import updateBoard from "../model/handleSubmit"

interface EditColumnModalProps {
  categories: TaskCategory[]
  onCategoriesChange: (categories: TaskCategory[]) => void
}

interface EditBoardValues {
  title: string
  fields: Array<{ id?: number; title: string }>
}

function EditColumnModal({ categories, onCategoriesChange }: EditColumnModalProps) {
  const { selectedColumn, setSelectedColumn } = useAppContext()
  const { closeModal } = useModal()

  if (!selectedColumn) {
    return null
  }

  const initialValues: EditBoardValues = {
    title: selectedColumn.title,
    fields: categories.map(({ id, title }) => ({ id, title })),
  }

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h3 className={`${textStyles.heading.lg} text-inherit`}>Edit Board</h3>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { title?: string; fields?: Array<{ title?: string }> } = {}

          if (!values.title.trim()) {
            errors.title = "Board name is required"
          }

          const fieldErrors = values.fields.map((field) =>
            field.id && !field.title.trim()
              ? { title: "Field name is required" }
              : {}
          )

          if (fieldErrors.some((error) => error.title)) {
            errors.fields = fieldErrors
          }

          return errors
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const updatedColumn = await updateBoard(values.title, selectedColumn.id)
            const updatedCategories = await Promise.all(
              values.fields
                .filter((field) => field.title.trim())
                .map((field) =>
                  field.id
                    ? updateCategory(selectedColumn.id, field.id, field.title.trim())
                    : createTaskCategory(selectedColumn.id, field.title.trim())
                )
            )

            setSelectedColumn(updatedColumn)
            onCategoriesChange(updatedCategories)
            closeModal()
          } catch {
            setStatus("Unable to update board")
          }
        }}
      >
        {({ errors, touched, status, isSubmitting, values }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="edit-board-title"
                className={`${textStyles.body.md} text-accent3-hover font-bold`}
              >
                Board Name
              </label>
              <Field
                id="edit-board-title"
                name="title"
                type="text"
                className="rounded border border-accent3-hover bg-transparent px-3 py-2"
              />
              {touched.title && errors.title && (
                <span className="text-sm text-red-400">{errors.title}</span>
              )}
            </div>

            <FieldArray name="fields">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  <span className={`${textStyles.body.md} text-accent3-hover font-bold`}>
                    Fields
                  </span>
                  {values.fields.map((field, index) => (
                    <div key={field.id ?? `new-${index}`} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Field
                          name={`fields.${index}.title`}
                          type="text"
                          placeholder="e.g. To Do"
                          className="min-w-0 flex-1 rounded border border-accent3-hover bg-transparent px-3 py-2"
                        />
                        {!field.id && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-sm font-bold text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {typeof errors.fields?.[index] !== "string" &&
                        errors.fields?.[index]?.title && (
                        <span className="text-sm text-red-400">
                          {errors.fields[index]?.title}
                        </span>
                      )}
                      {field.id && (
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteCategory(selectedColumn.id, field.id!)
                            onCategoriesChange(
                              categories.filter((category) => category.id !== field.id)
                            )
                            remove(index)
                          }}
                          className="self-start text-sm font-bold text-danger hover:text-danger/80"
                        >
                          Delete Field
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ title: "" })}
                    className={`${textStyles.body.md} self-start font-bold text-primary hover:text-primary-hover`}
                  >
                    + Add Field
                  </button>
                </div>
              )}
            </FieldArray>

            {status && <span className="text-sm text-red-400">{status}</span>}

            <Button type="submit" size="sm" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditColumnModal
