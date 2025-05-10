import styles from "./Input.module.scss";
import { InputProps } from "./Input.types";

export default function Input({
  inputId,
  value,
  onChange,
  className,
  placeholder,
  onBlur
}: InputProps) {
  return (
    <input
      type="text"
      id={inputId}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`${styles.input} ${styles[`${className}`]}`}
      placeholder={placeholder}
      required
    />
  );
}
