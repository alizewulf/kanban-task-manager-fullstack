export const settingsInputClassName =
  "mt-2 w-full rounded-xl border border-accent3 bg-accent4 px-4 py-3 text-sm text-accent1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export const settingsFeedbackClassName = (isSuccess: boolean) =>
  isSuccess ? "text-sm text-emerald-600" : "text-sm text-red-600";
