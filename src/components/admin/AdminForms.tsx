"use client";

import { OrderFormData, ProductFormData } from "@/schemas/product.schema";
import { ProductForm } from "./ProductForm";
import { OrderForm } from "./OrderForm";
import { useCreateProduct, useRemoveProduct, useUpdateOrderStatus, useUpdateProduct } from "@/hooks/useQueryClient";
import { DeleteProductForm } from "./DeleteProductForm";
import { UpdateProductForm } from "./UpdateProductForm";

export function AdminForms() {
  const { createProduct } = useCreateProduct();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const {  removeProduct} = useRemoveProduct();
  const {  updateProduct} = useUpdateProduct();


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
      <DeleteProductForm onSubmit={removeProduct}/>
      <UpdateProductForm onSubmit={updateProduct}/>
    </div>
  );
}
