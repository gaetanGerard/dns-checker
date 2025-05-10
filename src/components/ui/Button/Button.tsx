import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";

export default function Button({
  type = "button",
  onClick,
  children,
  variant = "primary",
  className,
  disabled = false,
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[variant],
        className && styles[className]
      )}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
