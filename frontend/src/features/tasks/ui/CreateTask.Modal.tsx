import textStyles from "@/shared/typography/typography"
import { Field, Form, Formik } from "formik"

function CreateTaskModal({data}) {
  return (
    <div className="flex flex-col">
        <h3 className={`${textStyles.heading.lg}`}>Add New Task</h3>

        <Formik initialValues={{
            title: "",
            description: "",
            categoryId: ""
        }} 
        onSubmit={(values) => {
            console.log(values)
        }}
        >
            <Form>
                <Field name="title"/>
                <Field name="description"/>
                <Field as="select" name="categoryId">

                </Field>

            </Form>
        </Formik>
    </div>
  )
}

export default CreateTaskModal