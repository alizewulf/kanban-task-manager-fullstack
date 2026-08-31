import textStyles from "@/shared/typography/typography"
import { Field, Formik, Form } from "formik"
function CreateColumnModal() {
  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <h2 className={`${textStyles.heading.lg} text-black`}>Add New Board</h2>

      <Formik initialValues={{
        boardName: "",
      }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >

        <Form className="flex flex-col gap-6">

          <div className="flex gap-2 flex-col">
            <span className={`${textStyles.body.md} text-accent3-hover font-bold`}>Board Name</span>
            <Field name="boardName" type="text" placeholder="e.g. Web Design" />
          </div>

          <button type="submit" className={`${textStyles.body.lg} text-white font-bold leading-5.75 py-2 bg-primary hover:bg-primary-hover rounded-[20px]`}>Create New Board</button>
        </Form>

      </Formik>
    </div>
  )
}

export default CreateColumnModal