"use client";
import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/interfaces/product.interface";

export default function Home() {
  const { data: productData, isLoading, error } = useProducts();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Erro ao carregar produtos" />;


  const products = productData?.products || [];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
