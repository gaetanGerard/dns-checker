import React from "react";

export interface TextareaProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  children?: React.ReactNode;
}
