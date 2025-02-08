import { Product } from "@/interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ProductsResponse {
  products: Product[]; 
  meta: PaginationMeta;
}

async function fetchProducts(page: number = 1, limit: number = 8) {
  const response = await fetch(
    `http://localhost:3001/product?page=${page}&limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json() as Promise<ProductsResponse>;
}

export function useProducts(page: number = 1, limit: number = 12) {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
    placeholderData: (previousData) => previousData,
  });
}