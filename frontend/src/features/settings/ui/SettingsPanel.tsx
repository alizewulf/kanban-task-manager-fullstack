import Button from "@/shared/ui/button/Button";
import { useSettings } from "../model/useSettings";
import ChangeLoginForm from "./ChangeLoginForm";
import ChangePasswordForm from "./ChangePasswordForm";

function SettingsPanel() {
  const settings = useSettings();

  return (
    <section className="w-[min(90vw,680px)] max-h-[85vh] overflow-y-auto" aria-labelledby="settings-title">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Account</p>
          <h2 id="settings-title" className="mt-1 text-2xl font-bold">Settings</h2>
          <p className="mt-2 text-sm text-accent3-hover">
            Current login: <span className="font-semibold text-inherit">{settings.user?.login ?? "—"}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={settings.closeModal}
          aria-label="Close settings"
          className="rounded-lg px-2 py-1 text-xl text-accent3-hover transition hover:bg-accent4"
        >
          ×
        </button>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <ChangeLoginForm
          newLogin={settings.form.newLogin}
          password={settings.form.loginPassword}
          setNewLogin={settings.form.setNewLogin}
          setPassword={settings.form.setLoginPassword}
          feedback={settings.loginFeedback}
          isSubmitting={settings.isChangingLogin}
          isDisabled={!settings.user}
          onSubmit={settings.handleLoginChange}
        />
        <ChangePasswordForm
          oldPassword={settings.form.oldPassword}
          newPassword={settings.form.newPassword}
          setOldPassword={settings.form.setOldPassword}
          setNewPassword={settings.form.setNewPassword}
          feedback={settings.passwordFeedback}
          isSubmitting={settings.isChangingPassword}
          isDisabled={!settings.user}
          onSubmit={settings.handlePasswordChange}
        />
      </div>

      <footer className="mt-6 flex justify-end border-t border-accent3/70 pt-5">
        <Button variant="destructive" size="sm" onClick={settings.handleLogout}>
          Log out
        </Button>
      </footer>
    </section>
  );
}

export default SettingsPanel;
