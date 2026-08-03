import textStyles from "../../typography/typography";

export type ButtonSizes = "lg" | "sm";
export type ButtonVariants = "primary" | "secondary" | "destructive";

export const ButtonvariantStyles: Record<ButtonVariants, string> = {
  primary: "bg-primary hover:bg-primary-hover",
  secondary: "bg-accent4 text-primary hover:bg-accent3",
  destructive: "bg-danger hover:bg-danger-hover",
};

export const Buttonsizes: Record<ButtonSizes, string> = {
  lg: `inline-flex items-center justify-center px-6 py-3 ${textStyles.heading.md} h-12`,
  sm: `inline-flex items-center justify-center px-6 py-2 ${textStyles.body.lg} h-10`,
};
