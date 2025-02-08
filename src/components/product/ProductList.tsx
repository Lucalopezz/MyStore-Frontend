"use client";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/interfaces/product.interface";
import { LoadingState } from "../LoadingState";
import { ErrorState } from "../ErrorState";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import Pagination from "../Pagination";

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    data: productData,
    isLoading,
    error,
  } = useProducts(currentPage, limit);

  if (!productData?.meta) return null;

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Erro ao carregar produtos" />;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-96 gap-y-10 p-4 ">
        {productData &&
          productData.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      
      <div className="flex justify-center  ">
        <Pagination
          meta={productData.meta}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
