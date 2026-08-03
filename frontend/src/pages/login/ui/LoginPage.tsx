import { Link } from "react-router";
import Button from "../../../shared/ui/button/Button";

function LoginPage() {
  return (
    <div className="w-full max-w-[460px] rounded-[32px] border border-accent3/80 bg-white p-8 shadow-[0_24px_80px_rgba(99,95,199,0.16)] sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">Kanban board</p>
        <h1 className="text-[28px] font-bold leading-tight text-accent1">Welcome back</h1>
        <p className="mt-2 text-[14px] leading-6 text-accent3-hover">Sign in to keep your tasks organized and move work forward.</p>
      </div>

      <form className="space-y-4">
        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block text-[13px] font-semibold text-accent1">
          <span className="mb-2 block">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl border border-accent3 bg-accent4 px-4 py-3 text-[14px] text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-accent3-hover">
            <input type="checkbox" className="h-4 w-4 rounded border-accent3 text-primary focus:ring-primary" />
            Remember me
          </label>
          <a href="#" className="font-semibold text-primary hover:text-primary-hover">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="mt-2 w-full">
          Sign in
        </Button>
      </form>

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