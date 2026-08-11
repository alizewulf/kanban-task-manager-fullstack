import { Formik } from "formik"
import Button from "../../../../shared/ui/button/Button"

function RegisterForm({ state, setState }: any) {
  return (
    <Formik initialValues={
      {
        email: "",
        password: ""
      }}
      onSubmit={() => {

      }}
    >
      <form className="space-y-4">
        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Email</span>
          <input
            onChange={(e) => {
              setState({
                ...state,
                login: e.target.value
              })
            }}
            value={setState.email}
            type="email"
            placeholder="alex@example.com"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Password</span>
          <input
            type="password"
            onChange={(e) => {
              setState({
                ...state,
                password: e.target.value
              })
            }}
            value={setState.password}
            placeholder="Create a strong password"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <Button type="submit" className="mt-2 w-full">
          Create account
        </Button>
      </form>
    </Formik>

  )
}

export default RegisterForm