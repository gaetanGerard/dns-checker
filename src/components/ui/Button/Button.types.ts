import { ReactNode } from "react";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "icon-button";
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
};
