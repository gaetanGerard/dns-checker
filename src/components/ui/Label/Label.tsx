import styles from "./Label.module.scss";
import { LabelProps } from "./Label.types";

export default function Label({ htmlFor, label, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${styles[`${className}`]}`}
    >
      {label}
    </label>
  );
}
