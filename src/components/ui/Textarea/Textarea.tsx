import React from "react";
import type { TextareaProps } from "./Textarea.types";
import styles from "./Textarea.module.scss";

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  className = "",
  children,
}) => (
  <div className={`${styles.textareaGroup} ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea
      id={id}
      className={styles.textarea}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {children}
  </div>
);

export default Textarea;
