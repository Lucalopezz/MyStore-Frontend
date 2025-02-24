"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/schemas/product.schema";
import { FormComponents } from "./FormComponents";


interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "", 
      quantity: 0,
      images: "",
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
    form.reset(); 
  };

  return (
    <FormComponents.Card>
      <FormComponents.CardHeader>
        <FormComponents.CardTitle>Adicionar Produto</FormComponents.CardTitle>
      </FormComponents.CardHeader>
      <FormComponents.CardContent>
        <FormComponents.Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormComponents.FormField
              control={form.control}
              name="name"
              label="Nome do Produto"
              placeholder="Digite o nome do produto"
            />

            <FormComponents.FormField
              control={form.control}
              name="description"
              label="Descrição"
              placeholder="Digite a descrição do produto"
              textarea
            />

            <FormComponents.FormField
              control={form.control}
              name="price"
              label="Preço"
              type="text"
              placeholder="0.00"
            />

            <FormComponents.FormField
              control={form.control}
              name="quantity"
              label="Quantidade"
              type="number"
              min="0"
              placeholder="0"
            />

            <FormComponents.FormField
              control={form.control}
              name="images"
              label="URL da Imagem"
              type="url"
              placeholder="https://"
            />

            <FormComponents.Button type="submit" className="w-full">
              Adicionar Produto
            </FormComponents.Button>
          </form>
        </FormComponents.Form>
      </FormComponents.CardContent>
    </FormComponents.Card>
  );
}