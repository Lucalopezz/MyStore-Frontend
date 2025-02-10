import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  error?: string;
  register: any;
}

export const FormField = ({
  label,
  id,
  type,
  placeholder,
  error,
  register,
}: FormFieldProps) => (
  <div>
    <Label htmlFor={id} className="text-gray-600">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...register(id)}
    />
    {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
  </div>
);
