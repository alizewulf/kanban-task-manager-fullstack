import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import Button from "@/shared/ui/button/Button";
import type { SettingsFeedback } from "../model/settings.types";
import { settingsFeedbackClassName, settingsInputClassName } from "./settingsStyles";

interface ChangePasswordFormProps {
  oldPassword: string;
  newPassword: string;
  setOldPassword: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  feedback: SettingsFeedback | null;
  isSubmitting: boolean;
  isDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

function ChangePasswordForm({
  oldPassword,
  newPassword,
  setOldPassword,
  setNewPassword,
  feedback,
  isSubmitting,
  isDisabled,
  onSubmit,
}: ChangePasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-accent3/70 p-5">
      <div>
        <h3 className="font-bold">Change password</h3>
        <p className="mt-1 text-xs text-accent3-hover">New password must be 6–255 characters.</p>
      </div>
      <label className="block text-sm font-medium">
        Current password
        <input
          required
          type="password"
          autoComplete="current-password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
          className={settingsInputClassName}
        />
      </label>
      <label className="block text-sm font-medium">
        New password
        <input
          required
          type="password"
          autoComplete="new-password"
          minLength={6}
          maxLength={255}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className={settingsInputClassName}
        />
      </label>
      {feedback && (
        <p role="status" className={settingsFeedbackClassName(feedback.isSuccess)}>
          {feedback.message}
        </p>
      )}
      <Button type="submit" size="sm" className="w-full" disabled={isSubmitting || isDisabled}>
        {isSubmitting ? "Saving…" : "Change password"}
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
