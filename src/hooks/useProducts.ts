import { Product } from "@/interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const response = await fetch("http://localhost:3001/product");
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  const data = response.json();

  return data
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
