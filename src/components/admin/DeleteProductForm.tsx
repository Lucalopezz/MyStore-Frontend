"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormComponents } from "./FormComponents";
import { BaseFormProps } from "@/types/form";
import { DeleteProductData, deleteProductSchema } from "@/schemas/product.schema";

export function DeleteProductForm({ onSubmit }: BaseFormProps<DeleteProductData>) {
  const form = useForm<DeleteProductData>({
    resolver: zodResolver(deleteProductSchema),
    defaultValues: {
      productId: 0,
    },
  });

  const handleSubmit = async (data: DeleteProductData) => {
    await onSubmit(data);
    form.reset({
      productId: 0,
    });
  };

  return (
    <FormComponents.Card>
      <FormComponents.CardHeader>
        <FormComponents.CardTitle>Excluir Produto</FormComponents.CardTitle>
      </FormComponents.CardHeader>
      <FormComponents.CardContent>
        <FormComponents.Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormComponents.FormField
              control={form.control}
              name="productId"
              label="ID do produto a ser excluído"
              placeholder="Digite o ID do produto"
              type="number"
            />

            <FormComponents.Button type="submit" className="w-full">
              Excluir Produto
            </FormComponents.Button>
          </form>
        </FormComponents.Form>
      </FormComponents.CardContent>
    </FormComponents.Card>
  );
}