import { Formik, Form } from "formik";
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
        email: "",
        password: "",
        rememberMe: false,
      }}
      onSubmit={(values) => {
        const result = login(users, {
          login: values.email,
          password: values.password,
        });

        console.log(result);
      }}
      validate={validate}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          <label className="block text-[13px] font-semibold text-accent1">
            <span className="mb-2 block">Login</span>

            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Login"
              className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block text-[13px] font-semibold text-accent1">
            <span className="mb-2 block">Password</span>

            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

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