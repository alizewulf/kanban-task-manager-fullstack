import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import Button from "../../../../shared/ui/button/Button";
import useLoginForm from "../model/useLoginForm";

function LoginForm() {
  const { formik, isSubmitLocked, clearErrorOnFieldChange } = useLoginForm();

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4" onSubmit={formik.handleSubmit}>
        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Login</span>

          <Field
            type="text"
            name="login"
            placeholder="Your login"
            onChange={clearErrorOnFieldChange}
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
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={clearErrorOnFieldChange}
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="mt-2 text-sm text-red-500"
          />
        </label>

        {formik.status ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formik.status}
          </div>
        ) : null}

        <div className="flex items-center justify-end text-[13px]">
          <a
            href="#"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Forgot password?
          </a>
        </div>
        <p className="text-xs text-accent3-hover">
          This session is kept in memory and ends when the page is reloaded.
        </p>

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isSubmitLocked}
        >
          {isSubmitLocked ? "Signing in..." : "Sign in"}
        </Button>
      </Form>
    </FormikProvider>
  );
}

export default LoginForm;