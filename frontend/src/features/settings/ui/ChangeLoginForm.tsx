import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import Button from "@/shared/ui/button/Button";
import type { SettingsFeedback } from "../model/settings.types";
import { settingsFeedbackClassName, settingsInputClassName } from "./settingsStyles";

interface ChangeLoginFormProps {
  newLogin: string;
  password: string;
  setNewLogin: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  feedback: SettingsFeedback | null;
  isSubmitting: boolean;
  isDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

function ChangeLoginForm({
  newLogin,
  password,
  setNewLogin,
  setPassword,
  feedback,
  isSubmitting,
  isDisabled,
  onSubmit,
}: ChangeLoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-accent3/70 p-5">
      <div>
        <h3 className="font-bold">Change login</h3>
        <p className="mt-1 text-xs text-accent3-hover">Confirm with your current password.</p>
      </div>
      <label className="block text-sm font-medium">
        New login
        <input
          required
          autoComplete="username"
          value={newLogin}
          onChange={(event) => setNewLogin(event.target.value)}
          className={settingsInputClassName}
          maxLength={50}
        />
      </label>
      <label className="block text-sm font-medium">
        Password confirmation
        <input
          required
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={settingsInputClassName}
        />
      </label>
      {feedback && (
        <p role="status" className={settingsFeedbackClassName(feedback.isSuccess)}>
          {feedback.message}
        </p>
      )}
      <Button type="submit" size="sm" className="w-full" disabled={isSubmitting || isDisabled}>
        {isSubmitting ? "Saving…" : "Change login"}
      </Button>
    </form>
  );
}

export default ChangeLoginForm;
