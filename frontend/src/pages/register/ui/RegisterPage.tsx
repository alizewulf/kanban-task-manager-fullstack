import { Link } from "react-router";
import RegisterForm from "../../../features/auth/register/ui/RegisterForm";

function RegisterPage() {

  return (
    <div className="w-full max-w-[460px] rounded-[32px] border border-accent3/80 bg-white p-8 shadow-[0_24px_80px_rgba(99,95,199,0.16)] sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">Kanban board</p>
        <h1 className="text-[28px] font-bold leading-tight text-accent1">Create your account</h1>
        <p className="mt-2 text-[14px] leading-6 text-accent3-hover">Set up your workspace and start planning your next big move.</p>
      </div>

      <RegisterForm/>
      <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-accent3-hover">
        <span>Already have an account?</span>
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;