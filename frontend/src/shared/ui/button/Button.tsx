import type { CSSProperties, ReactNode } from "react";
import { Buttonsizes, ButtonvariantStyles } from "@/shared/ui/button/styles";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: any
}

export type ButtonSizes = "lg" | "sm";
export type ButtonVariants = "primary" | "secondary" | "destructive";

function Button({ children, onClick, variant = "primary", size = "lg", className = "", style, type = "button", disabled = false }: ButtonProps) {
  const buttonClassName = `${ButtonvariantStyles[variant]} rounded-full border border-transparent transition-all duration-200`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClassName} text-white ${Buttonsizes[size]} ${variant === "secondary"? "bg-primary/10! text-primary!":""} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;