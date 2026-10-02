import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import Button from "../../../../shared/ui/button/Button";
import useLoginForm from "../model/useLoginForm";

function LoginForm() {
  const { formik, isSubmitLocked, clearErrorOnFieldChange } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4" onSubmit={formik.handleSubmit}>
        <label className={`block text-[13px] font-semibold ${isDark ? "text-slate-100" : "text-accent1"}`}>
          <span className="mb-2 block">Login</span>

          <Field
            type="text"
            name="login"
            placeholder="Your login"
            onChange={clearErrorOnFieldChange}
            className={`w-full rounded-2xl border px-4 py-3 text-[14px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${isDark
              ? "border-slate-700 bg-slate-900/80 text-slate-50 placeholder:text-slate-400"
              : "border-accent3 bg-accent4 text-accent1 placeholder:text-accent3-hover"
            }`}
          />
          <ErrorMessage
            name="login"
            component="div"
            className="mt-2 text-sm text-red-500"
          />
        </label>

        <label className={`block text-[13px] font-semibold ${isDark ? "text-slate-100" : "text-accent1"}`}>
          <span className="mb-2 block">Password</span>

          <div className="relative">
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={clearErrorOnFieldChange}
              className={`w-full rounded-2xl border px-4 py-3 pr-12 text-[14px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${isDark
                ? "border-slate-700 bg-slate-900/80 text-slate-50 placeholder:text-slate-400"
                : "border-accent3 bg-accent4 text-accent1 placeholder:text-accent3-hover"
              }`}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((current) => !current)}
              className={`absolute inset-y-0 right-3 flex items-center transition ${isDark ? "text-slate-400 hover:text-slate-200" : "text-accent3-hover hover:text-accent1"}`}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                  <path d="M3 3L21 21" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.88 5.08A10.94 10.94 0 0 1 12 5c4.97 0 8.5 4.5 9 7-.48 1.92-2.08 4.7-4.86 6.24" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.61 6.61A15.62 15.62 0 0 0 3 12c.5 2.5 4.03 7 9 7 1.82 0 3.46-.4 4.89-1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <ErrorMessage
            name="password"
            component="div"
            className="mt-2 text-sm text-red-500"
          />
        </label>

        {formik.status ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-red-500/40 bg-red-950/30 text-red-200" : "border-red-200 bg-red-50 text-red-700"}`}>
            {formik.status}
          </div>
        ) : null}

        <p className={`text-xs ${isDark ? "text-slate-400" : "text-accent3-hover"}`}>
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