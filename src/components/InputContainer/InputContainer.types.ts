export type InputContainerProps = {
  label: string;
  inputId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  onBlur?: () => void;
};
