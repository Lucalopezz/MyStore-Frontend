"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { FormComponents } from "./FormComponents";
import { BaseFormProps } from "@/types/form";
import { UpdateProductData, updateProductSchema } from "@/schemas/product.schema";
import { getProductById } from "@/utils/product/product";


export function UpdateProductForm({ onSubmit }: BaseFormProps<UpdateProductData>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<UpdateProductData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productId: "",
      name: "",
      description: "",
      price: "",
      quantity: 0,
      images: ""
    },
  });
  const fetchProduct = async () => {
    const productId = form.getValues("productId");
    
    if (!productId || productId.trim() === "") {
      setError("Digite um ID de produto válido");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const numericId = parseInt(productId, 10);
      
      if (isNaN(numericId)) {
        setError("ID do produto deve ser um número válido");
        setIsLoading(false);
        return;
      }
      
      const productData = await getProductById(numericId);
      
      if (productData) {
        form.setValue("name", productData.name || "");
        form.setValue("description", productData.description || "");
        form.setValue("price", productData.price || undefined);
        form.setValue("quantity", productData.quantity || undefined);
        form.setValue("images", productData.images || "");
      } else {
        setError("Produto não encontrado");
      }
    } catch (err) {
      setError("Erro ao buscar os dados do produto");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: UpdateProductData) => {
    await onSubmit(data);
    form.reset();
    setError(null);
  };

  return (
    <FormComponents.Card>
      <FormComponents.CardHeader>
        <FormComponents.CardTitle>Atualizar Produto</FormComponents.CardTitle>
      </FormComponents.CardHeader>
      <FormComponents.CardContent>
        <FormComponents.Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-grow">
                <FormComponents.FormField
                  control={form.control}
                  name="productId"
                  label="ID do Produto"
                  placeholder="Digite o ID do produto"
                />
              </div>
              <div className="flex items-end">
                <FormComponents.Button 
                  type="button" 
                  onClick={fetchProduct}
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? "Carregando..." : "Buscar"}
                </FormComponents.Button>
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-red-500 mt-1">{error}</div>
            )}
            
            <FormComponents.FormField
              control={form.control}
              name="name"
              label="Nome do Produto"
              placeholder="Digite o nome do produto"
              disabled={isLoading}
            />
            
            <FormComponents.FormField
              control={form.control}
              name="description"
              label="Descrição"
              placeholder="Digite a descrição do produto"
              disabled={isLoading}
            />
            
            <FormComponents.FormField
              control={form.control}
              name="price"
              label="Preço"
              placeholder="Digite o preço do produto"
              type="text"
              disabled={isLoading}
            />
            
            <FormComponents.FormField
              control={form.control}
              name="quantity"
              label="Quantidade em Estoque"
              placeholder="Digite a quantidade em estoque"
              type="number"
              disabled={isLoading}
            />
            
            <FormComponents.FormField
              control={form.control}
              name="images"
              label="URL da Imagem"
              placeholder="Digite a URL da imagem do produto"
              disabled={isLoading}
            />

            <FormComponents.Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              Atualizar Produto
            </FormComponents.Button>
          </form>
        </FormComponents.Form>
      </FormComponents.CardContent>
    </FormComponents.Card>
  );
}