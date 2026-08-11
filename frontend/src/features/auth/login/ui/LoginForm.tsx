import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../../shared/ui/button/Button";
import validate from "../model/validate";
import type { User } from "../../../../entities/users/interface";

interface LoginFormProps {
  login: (
    users: User[],
    form: {
      login: string;
      password: string;
    }
  ) => User | "error";

  users: User[];
}

function LoginForm({ login, users }: LoginFormProps) {
  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
        rememberMe: false,
      }}
      onSubmit={(values, { setStatus }) => {
        const result = login(users, {
          login: values.login,
          password: values.password,
        });

        if (result === "error") {
          setStatus("WRONG LOGIN OR PASSWORD");
          return;
        }

        setStatus("WELCOME BACK");
        console.log("Authorized user:", result);
      }}
      validate={validate}
    >
      {({ values, handleChange, status }) => (
        <Form className="space-y-4">
          <label className="block text-[13px] font-semibold text-accent1">
            <span className="mb-2 block">Login</span>

            <Field
              type="text"
              name="login"
              placeholder="Your login"
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
              className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </label>

          {status ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {status}
            </div>
          ) : null}

          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 text-accent3-hover">
              <input
                type="checkbox"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
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

          <Button type="submit" className="mt-2 w-full">
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;