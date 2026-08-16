import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import Button from "../../../../shared/ui/button/Button";
import type { LoginFormProps } from "./interface";
import useLoginForm from "../model/useLoginForm";

function LoginForm({ login, users, isUsersLoading = false }: LoginFormProps) {
  const { formik, isSubmitLocked, clearErrorOnFieldChange } = useLoginForm({
    login,
    users,
    isUsersLoading,
  });

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

        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-accent3-hover">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={(event) => {
                clearErrorOnFieldChange(event);
              }}
              className="h-4 w-4 rounded border-accent3 text-primary focus:ring-primary"
            />

            Remember me
          </label>

          <a
            href="#"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isSubmitLocked}
        >
          {isUsersLoading ? "Loading..." : "Sign in"}
        </Button>
      </Form>
    </FormikProvider>
  );
}

export default LoginForm;