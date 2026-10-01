import { Link } from "react-router";
import { useSelector } from "react-redux";
import LoginForm from "../../../features/auth/login";
import ThemeButton from "../../../features/theme";
import type { RootState } from "../../../store/store";

function LoginPage() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full max-w-[460px] rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(99,95,199,0.16)] transition-colors duration-200 sm:p-10 ${isDark
        ? "border-slate-700 bg-slate-950 text-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.6)]"
        : "border-accent3/80 bg-white text-accent1"
      }`}
    >
      <div className="mb-6 flex justify-end">
        <ThemeButton variant="login" />
      </div>

      <div className="mb-8">
        <p className={`mb-2 text-[12px] font-semibold uppercase tracking-[0.24em] ${isDark ? "text-primary" : "text-primary"}`}>Kanban board</p>
        <h1 className={`text-[28px] font-bold leading-tight ${isDark ? "text-slate-50" : "text-accent1"}`}>Welcome back</h1>
        <p className={`mt-2 text-[14px] leading-6 ${isDark ? "text-slate-300" : "text-accent3-hover"}`}>Sign in to keep your tasks organized and move work forward.</p>
      </div>

      <LoginForm />

      <div className={`mt-6 flex items-center justify-center gap-2 text-[13px] ${isDark ? "text-slate-300" : "text-accent3-hover"}`}>
        <span>New here?</span>
        <Link to="/register" className="font-semibold text-primary hover:text-primary-hover">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;