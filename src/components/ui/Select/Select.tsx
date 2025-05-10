import React from "react";
import styles from "./Select.module.scss";
import type { SelectProps, SelectOption } from "./Select.types";

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
}) => (
  <div className={`${styles.selectGroup} ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <select
      id={id}
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
