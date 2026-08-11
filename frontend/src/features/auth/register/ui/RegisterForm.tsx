import { Field, Form, Formik } from "formik"
import Button from "../../../../shared/ui/button/Button"
import createUser from "../model/createUser"

function RegisterForm() {
  return (
    <Formik initialValues={
      {
        login: "",
        password: ""
      }}
      onSubmit={(values) => {
          console.log(values)
          createUser(values)
      }}
    >
      <Form className="space-y-4">
        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Login</span>
          <Field
            name="login"
            type="text"
            placeholder="Your Login"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Password</span>
          <Field
            name="password"
            type="password"
            placeholder="Create a strong password"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <Button type="submit" className="mt-2 w-full">
          Create account
        </Button>
      </Form>
    </Formik>
  )
}

export default RegisterForm