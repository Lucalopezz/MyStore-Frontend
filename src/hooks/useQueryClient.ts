import { Product } from "@/interfaces/product.interface";
import { User } from "@/interfaces/user.interface";
import { CreateAccountFormData } from "@/schemas/createAccount";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { getSession } from "next-auth/react";
import api from "@/utils/api";
import axios from "axios";

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

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

async function fetchProducts(page: number = 1, limit: number = 8): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponse>("/product", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos");
    }
    throw new Error("Erro ao buscar produtos");
  }
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
      const { confirmPassword, ...userData } = data;
      try {
        const response = await api.post("/user", userData);
        return response.data;
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          throw new Error(err.response.data.message || "Erro ao criar conta");
        }
        throw new Error("Erro ao criar conta");
      }
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


async function fetchUser(): Promise<User> {
  const session = await getSession();
  if (!session) {
    throw new Error("Sessão não encontrada.");
  }

  try {
    const response = await api.get<User>('/user/get-one', {
      headers: {
        Authorization: `Bearer ${session.jwt}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    placeholderData: (previousData) => previousData,
  });
}
