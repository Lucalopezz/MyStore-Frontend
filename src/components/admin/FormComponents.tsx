import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField as BaseFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/types/form";

function FormField({ 
  control, 
  name, 
  label, 
  placeholder, 
  type = "text",
  textarea = false,
  render,
  ...props 
}: FormFieldProps) {
  if (render) {
    return (
      <BaseFormField
        control={control}
        name={name}
        render={render}
      />
    );
  }

  return (
    <BaseFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                {...props}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(Number(e.target.value));
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export const FormComponents = {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};