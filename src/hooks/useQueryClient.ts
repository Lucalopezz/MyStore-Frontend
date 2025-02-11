import { Product } from "@/interfaces/product.interface";
import { User } from "@/interfaces/user.interface";
import { CreateAccountFormData } from "@/schemas/createAccount";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { getSession } from "next-auth/react";

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

const apiUrl = "http://localhost:3001/";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

async function fetchProducts(page: number = 1, limit: number = 8) {
  const response = await fetch(`${apiUrl}product?page=${page}&limit=${limit}`);

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

export function useCreateUser() {
  const router = useRouter();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: CreateAccountFormData) => {
      const response = await fetch(`${apiUrl}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/login");
      toast.success("Conta criada com sucesso! Faça o login agora");
    },
    onError: (err: Error) => {
      setError(err.message || "Algo deu errado");
    },
  });

  return {
    createUser: mutation.mutate,
    isLoading: mutation.isPending,
    error,
  };
}
async function fetchUser() {
  const session = await getSession();

  const response = await fetch(`${apiUrl}user/get-one`, {
    headers: {
      Authorization: `Bearer ${session?.jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  const { user } = await response.json();

  return user as Promise<User>;
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    placeholderData: (previousData) => previousData,
  });
}
