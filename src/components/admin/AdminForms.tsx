"use client";

import { OrderFormData, ProductFormData } from "@/schemas/product.schema";
import { ProductForm } from "./ProductForm";
import { OrderForm } from "./OrderForm";

export function AdminForms() {
  const handleProductSubmit = async (data: ProductFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderSubmit = async (data: OrderFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductForm onSubmit={handleProductSubmit} />
      <OrderForm onSubmit={handleOrderSubmit} />
    </div>
  );
}
