import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({ children, variant = "primary", onClick, type = "button" }: ButtonProps) {
  return (
    <button className={`button button-${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
