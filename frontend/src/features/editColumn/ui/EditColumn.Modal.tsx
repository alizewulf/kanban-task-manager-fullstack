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
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import RemoveIcon from "@/shared/ui/icons/RemoveIcon"

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
  const theme = useSelector((state: RootState) => state.theme.theme)
  const isDark = theme === "dark"

  if (!selectedColumn) {
    return null
  }

  const initialValues: EditBoardValues = {
    title: selectedColumn.title,
    fields: categories.map(({ id, title }) => ({ id, title })),
  }

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h2 className={`${textStyles.heading.lg} text-inherit`}>Edit Board</h2>

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
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="edit-board-title"
                className={`${textStyles.body.md} text-accent3-hover font-bold!`}
              >
                Name
              </label>
              <Field
                id="edit-board-title"
                name="title"
                type="text"
                placeholder="e.g. Web Design"
                className={`outline outline-accent3-hover py-2 px-4 placeholder:${textStyles.body.lg}`}
              />
              {touched.title && errors.title && (
                <span className="text-sm text-red-400">{errors.title}</span>
              )}
            </div>

            <FieldArray name="fields">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  <span className={`${textStyles.body.md} text-accent3-hover font-bold`}>
                    Columns
                  </span>
                  {values.fields.map((field, index) => (
                    <div key={field.id ?? `new-${index}`} className="flex flex-col gap-2">
                      <div className="flex gap-4 items-center">
                        <Field
                          name={`fields.${index}.title`}
                          type="text"
                          placeholder="e.g. To Do"
                          className={`min-w-0 flex-1 px-4 py-2 outline outline-accent3-hover ${textStyles.body.lg} ${isDark ? "placeholder:text-black text-black!" : "placeholder:text-white! text-white"}`}
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!field.id) {
                              remove(index)
                              return
                            }

                            await deleteCategory(selectedColumn.id, field.id)
                            onCategoriesChange(
                              categories.filter((category) => category.id !== field.id)
                            )
                            remove(index)
                          }}
                          aria-label={`Delete ${field.title || "column"}`}
                          className="w-3.5 h-3.5"
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                      {typeof errors.fields?.[index] !== "string" &&
                        errors.fields?.[index]?.title && (
                        <span className="text-sm text-red-400">
                          {errors.fields[index]?.title}
                        </span>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ title: "" })}
                    className={`${textStyles.body.md} bg-white text-primary py-2 font-bold! rounded-[20px] h-10`}
                  >
                    + Add New Column
                  </button>
                </div>
              )}
            </FieldArray>

            {status && <span className="text-sm text-red-400">{status}</span>}

            <Button type="submit" size="sm" disabled={isSubmitting} className="w-full font-bold!">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditColumnModal
