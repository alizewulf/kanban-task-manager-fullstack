import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import Button from "../../../../shared/ui/button/Button"
import type { AppDispatch } from "../../../../store/store"
import { setAuth } from "../../login/model/authSlice"
import { setAccessToken } from "../../../../shared/config/api/accessToken"
import validate from "../model/validate"
import createUser from "../model/createUser"
import axios from "axios"

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <Formik initialValues={
      {
        login: "",
        password: ""
      }}
      validate={validate}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        try {
          const response = await createUser(values)
          setAccessToken(response.accessToken)
          dispatch(setAuth({ user: response.data }))
          navigate("/app", { replace: true })
        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.message
            : undefined
          setStatus(message ?? "Unable to create account")
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, status }) => (
      <Form className="space-y-4">
        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Login</span>
          <Field
            name="login"
            type="text"
            placeholder="Your Login"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <ErrorMessage
            name="login"
            component="div"
            className="mt-2 text-sm text-red-500"
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
          <ErrorMessage
            name="password"
            component="div"
            className="mt-2 text-sm text-red-500"
          />
        </label>

        {status ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {status}
          </div>
        ) : null}

        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </Form>
      )}
    </Formik>
  )
}

export default RegisterForm