export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  disabled?: boolean;
};
