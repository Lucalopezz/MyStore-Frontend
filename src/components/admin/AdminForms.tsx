"use client";

import { OrderFormData, ProductFormData } from "@/schemas/product.schema";
import { ProductForm } from "./ProductForm";
import { OrderForm } from "./OrderForm";
import { useCreateProduct, useUpdateOrderStatus } from "@/hooks/useQueryClient";
import { DeleteProductForm } from "./DeleteProductForm";
import { UpdateProductForm } from "./UpdateProductForm";

export function AdminForms() {
  const { createProduct } = useCreateProduct();
  const { updateOrderStatus } = useUpdateOrderStatus();


  const handleProductSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderSubmit = async (data: OrderFormData) => {
    try {
      await updateOrderStatus(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductForm onSubmit={handleProductSubmit} />
      <OrderForm onSubmit={handleOrderSubmit} />
      <DeleteProductForm onSubmit={() => alert('foi')}/>
      <UpdateProductForm onSubmit={() => alert('foi')}/>
    </div>
  );
}
