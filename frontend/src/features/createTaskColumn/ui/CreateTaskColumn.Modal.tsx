import { Field, Form, Formik } from "formik"

import type { TaskCategory } from "@/features/taskCategories/model/category.types"
import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import { useModal } from "@/shared/ui/modal/useModal"
import createTaskCategory from "../model/createTaskCategory"

interface CreateTaskColumnModalProps {
  onCreated: (category: TaskCategory) => void
}

function CreateTaskColumnModal({ onCreated }: CreateTaskColumnModalProps) {
  const { selectedColumn } = useAppContext()
  const { closeModal } = useModal()

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h2 className={`${textStyles.heading.lg} text-inherit`}>Add New Column</h2>

      <Formik
        initialValues={{ title: "" }}
        validate={(values) => {
          const errors: { title?: string } = {}

          if (!values.title.trim()) {
            errors.title = "Column name is required"
          }

          return errors
        }}
        onSubmit={async (values, { setStatus }) => {
          if (!selectedColumn) {
            setStatus("Select a board before creating a column")
            return
          }

          try {
            const category = await createTaskCategory(
              selectedColumn.id,
              values.title.trim()
            )

            onCreated(category)
            closeModal()
          } catch {
            setStatus("Unable to create column")
          }
        }}
      >
        {({ errors, touched, status, isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="task-column-title"
                className={`${textStyles.body.md} text-accent3-hover font-bold`}
              >
                Column Name
              </label>
              <Field
                id="task-column-title"
                name="title"
                type="text"
                placeholder="e.g. In Progress"
                className="rounded border border-accent3-hover bg-transparent px-3 py-2"
              />
              {touched.title && errors.title && (
                <span className="text-sm text-red-400">{errors.title}</span>
              )}
              {status && <span className="text-sm text-red-400">{status}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${textStyles.body.lg} text-white font-bold leading-5.75 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 rounded-[20px]`}
            >
              {isSubmitting ? "Creating..." : "Create New Column"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTaskColumnModal