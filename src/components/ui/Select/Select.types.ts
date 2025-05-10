export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  id?: string;
  label?: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string | number) => void;
  className?: string;
}
