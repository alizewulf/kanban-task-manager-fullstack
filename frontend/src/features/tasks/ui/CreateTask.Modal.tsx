import { Field, Form, Formik } from "formik"

import { createTask } from "@/features/tasks/model/createTask"
import { useAppContext } from "@/shared/context/app.context"
import textStyles from "@/shared/typography/typography"
import { useModal } from "@/shared/ui/modal/useModal"

function CreateTaskModal() {
  const { categories, setTasks } = useAppContext()
  const { closeModal } = useModal()

  const initialCategoryId = categories[0]?.id ? String(categories[0].id) : ""

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h3 className={`${textStyles.heading.lg} text-inherit`}>Add New Task</h3>

      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          description: "",
          categoryId: initialCategoryId,
        }}
        validate={(values) => {
          const errors: { title?: string; categoryId?: string } = {}

          if (!values.title.trim()) {
            errors.title = "Task title is required"
          }

          if (!values.categoryId) {
            errors.categoryId = "Select a category"
          }

          return errors
        }}
        onSubmit={async (values, { setStatus }) => {
          const categoryId = Number(values.categoryId)

          if (!categoryId) {
            setStatus("Select a category")
            return
          }

          try {
            const newTask = await createTask(categoryId, {
              title: values.title.trim(),
              description: values.description.trim(),
            })

            setTasks((current) => ({
              ...current,
              [newTask.category_id]: [...(current[newTask.category_id] ?? []), newTask],
            }))

            closeModal()
          } catch {
            setStatus("Unable to create task")
          }
        }}
      >
        {({ errors, touched, status, isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="task-title" className={`${textStyles.body.md} text-accent3-hover font-bold`}>
                Title
              </label>
              <Field
                id="task-title"
                name="title"
                type="text"
                placeholder="e.g. Fix login flow"
                className="rounded border border-accent3-hover bg-transparent px-3 py-2"
              />
              {touched.title && errors.title && (
                <span className="text-sm text-red-400">{errors.title}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="task-description" className={`${textStyles.body.md} text-accent3-hover font-bold`}>
                Description
              </label>
              <Field
                id="task-description"
                as="textarea"
                name="description"
                placeholder="Add details"
                className="min-h-24 rounded border border-accent3-hover bg-transparent px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="task-category" className={`${textStyles.body.md} text-accent3-hover font-bold`}>
                Category
              </label>
              <Field
                as="select"
                id="task-category"
                name="categoryId"
                className="rounded border border-accent3-hover bg-transparent px-3 py-2"
                disabled={categories.length === 0}
              >
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.title}
                  </option>
                ))}
              </Field>
              {touched.categoryId && errors.categoryId && (
                <span className="text-sm text-red-400">{errors.categoryId}</span>
              )}
            </div>

            {status && <span className="text-sm text-red-400">{status}</span>}

            <button
              type="submit"
              disabled={isSubmitting || categories.length === 0}
              className={`${textStyles.body.lg} text-white font-bold leading-5.75 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 rounded-[20px]`}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTaskModal