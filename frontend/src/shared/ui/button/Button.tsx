import type { CSSProperties, ReactNode } from "react";
import { Buttonsizes, ButtonvariantStyles } from "./styles";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export type ButtonSizes = "lg" | "sm";
export type ButtonVariants = "primary" | "secondary" | "destructive";

function Button({ children, variant = "primary", size = "lg", className = "", style, type = "button" }: ButtonProps) {
  const buttonClassName = `${ButtonvariantStyles[variant]} rounded-full border border-transparent transition-all duration-200`;

  return (
    <button
      type={type}
      className={`${buttonClassName} text-white ${Buttonsizes[size]} cursor-pointer ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;