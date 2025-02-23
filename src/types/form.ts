import { Control } from "react-hook-form";

export interface BaseFormProps<T> {
  onSubmit: (data: T) => void;
}

export interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
  [key: string]: any;
}