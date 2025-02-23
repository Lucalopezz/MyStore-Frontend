"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormComponents } from "./FormComponents";
import { BaseFormProps } from "@/types/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { OrderFormData, orderSchema } from "@/schemas/product.schema";

const ORDER_STATUS_OPTIONS = [
  { value: 'processando', label: 'Processando' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'cancelado', label: 'Cancelado' },
];

export function OrderForm({ onSubmit }: BaseFormProps<OrderFormData>) {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: "",
      status: "processando",
    },
  });

  const handleSubmit = async (data: OrderFormData) => {
    await onSubmit(data);
    form.reset({
      orderId: "",
      status: "processando"
    });
  };

  return (
    <FormComponents.Card>
      <FormComponents.CardHeader>
        <FormComponents.CardTitle>Atualizar Status do Pedido</FormComponents.CardTitle>
      </FormComponents.CardHeader>
      <FormComponents.CardContent>
        <FormComponents.Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormComponents.FormField
              control={form.control}
              name="orderId"
              label="ID do Pedido"
              placeholder="Digite o ID do pedido"
            />

            <FormComponents.FormField
              control={form.control}
              name="status"
              label="Status"
              render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
                <FormComponents.FormItem>
                  <FormComponents.FormLabel>Status</FormComponents.FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormComponents.FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormComponents.FormControl>
                    <SelectContent>
                      {ORDER_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormComponents.FormMessage />
                </FormComponents.FormItem>
              )}
            />

            <FormComponents.Button type="submit" className="w-full">
              Atualizar Status
            </FormComponents.Button>
          </form>
        </FormComponents.Form>
      </FormComponents.CardContent>
    </FormComponents.Card>
  );
}