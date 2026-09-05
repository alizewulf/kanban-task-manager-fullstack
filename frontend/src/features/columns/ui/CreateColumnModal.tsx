import textStyles from "@/shared/typography/typography"
import { useModal } from "@/shared/ui/modal/useModal"
import { Field, Formik, Form } from "formik"
import createColumn from "../model/createColumn"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

function CreateColumnModal() {
  const { closeModal } = useModal()
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h2 className={`${textStyles.heading.lg} text-black`}>Add New Board</h2>

      <Formik initialValues={{
        title: "",
      }}
        onSubmit={async (value) => {
          if (!auth.user) {
            console.error("connection error")
            return
          }

          await createColumn(auth.user.id, value.title)
          closeModal()
        }}
      >

        <Form className="flex flex-col gap-6">

          <div className="flex gap-2 flex-col">
            <span className={`${textStyles.body.md} text-accent3-hover font-bold`}>Board Name</span>
            <Field name="title" type="text" placeholder="e.g. Web Design" />
          </div>

          <button type="submit" className={`${textStyles.body.lg} text-white font-bold leading-5.75 py-2 bg-primary hover:bg-primary-hover rounded-[20px]`}>Create New Board</button>
        </Form>

      </Formik>
    </div>
  )
}

export default CreateColumnModal