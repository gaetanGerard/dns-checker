import styles from "./InputContainer.module.scss";
import Label from "@/components/ui/Label/Label";
import Input from "@/components/ui/Input/Input";
import InputHelper from "@/components/ui/InputHelper/InputHelper";
import InputErrorMsg from "@/components/ui/InputErrorMsg/InputErrorMsg";

import type { InputContainerProps } from "./InputContainer.types";

export default function InputContainer({
  label,
  inputId,
  value,
  onChange,
  labelClassName,
  inputClassName,
  placeholder,
  helperText,
  errorText,
  onBlur,
}: InputContainerProps) {
  return (
    <div className={styles.container}>
      <Label htmlFor={inputId} label={label} className={labelClassName} />
      <Input
        inputId={inputId}
        value={value}
        onChange={onChange}
        className={inputClassName}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {helperText && <InputHelper>{helperText}</InputHelper>}
      {errorText && <InputErrorMsg>{errorText}</InputErrorMsg>}
    </div>
  );
}
