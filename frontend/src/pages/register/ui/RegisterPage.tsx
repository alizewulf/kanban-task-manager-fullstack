import { Link } from "react-router";
import { useSelector } from "react-redux";
import RegisterForm from "../../../features/auth/register/ui/RegisterForm";
import ThemeButton from "../../../features/theme";
import type { RootState } from "../../../store/store";

function RegisterPage() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div className={`w-full max-w-[460px] rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(99,95,199,0.16)] transition-colors duration-200 sm:p-10 ${isDark ? "border-accent2-hover bg-dark text-white" : "border-accent3/80 bg-white text-accent1"}`}>
      <div className="mb-6 flex justify-end">
        <ThemeButton variant="login" />
      </div>
      <div className="mb-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">Kanban board</p>
        <h1 className={`text-[28px] font-bold leading-tight ${isDark ? "text-white" : "text-accent1"}`}>Create your account</h1>
        <p className={`mt-2 text-[14px] leading-6 ${isDark ? "text-slate-300" : "text-accent3-hover"}`}>Set up your workspace and start planning your next big move.</p>
      </div>

      <RegisterForm />
      <div className={`mt-6 flex items-center justify-center gap-2 text-[13px] ${isDark ? "text-slate-300" : "text-accent3-hover"}`}>
        <span>Already have an account?</span>
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;