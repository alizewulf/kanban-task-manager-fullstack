import { Link } from "react-router";
import LoginForm from "../../../features/auth/login";

function LoginPage() {
  return (
    <div className="w-full max-w-[460px] rounded-[32px] border border-accent3/80 bg-white p-8 shadow-[0_24px_80px_rgba(99,95,199,0.16)] sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">Kanban board</p>
        <h1 className="text-[28px] font-bold leading-tight text-accent1">Welcome back</h1>
        <p className="mt-2 text-[14px] leading-6 text-accent3-hover">Sign in to keep your tasks organized and move work forward.</p>
      </div>

      <LoginForm />

      <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-accent3-hover">
        <span>New here?</span>
        <Link to="/register" className="font-semibold text-primary hover:text-primary-hover">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;