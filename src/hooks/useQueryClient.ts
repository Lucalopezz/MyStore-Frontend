import { Product } from "@/interfaces/product.interface";
import { User } from "@/interfaces/user.interface";
import { CreateAccountFormData } from "@/schemas/createAccount";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { getSession } from "next-auth/react";

import axios from "axios";
import { UpdateProfileData, updateProfilePictureData } from "@/schemas/profile";
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";
import { Cart, Order } from "@/interfaces/order.interface";
import { OrderFormData } from "@/schemas/product.schema";

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

interface createCartProps {
  productId: number;
  quantity: number;
}

interface AddProductProps {
  productId: number;
  quantity: number;
}

interface JwtPayload {
  sub: string;
}
interface CreateOrderProps {
  cartId: number;
}

interface CreateProductProps {
  name: string;
  description?: string;
  price: string;
  quantity: number;
  images: string;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

async function fetchProducts(
  page: number = 1,
  limit: number = 8
): Promise<ProductsResponse> {
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
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || "Erro ao criar conta");
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
    const response = await api.get<User>("/user/get-one", {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
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

export function useUploadUserImage() {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: updateProfilePictureData) => {
      const file = data.image[0];

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("/user/upload-picture", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Erro ao atualizar imagem"
          );
        }
        throw new Error("Erro ao atualizar imagem");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Imagem de perfil atualizada com sucesso!");
    },
    onError: (err: Error) => {
      setError(err.message);
      toast.error(err.message);
    },
  });

  return {
    uploadImage: mutation.mutate,
    error,
    isLoading: mutation.isPending,
  };
}

export function useUpdateUser() {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const session = await getSession();
      if (!session || !session.jwt) {
        throw new Error("Sessão não encontrada.");
      }

      const decodedToken: JwtPayload = jwtDecode(session.jwt);
      if (!decodedToken.sub) {
        throw new Error("ID do usuário não encontrado no token.");
      }

      const userData = { password: data.newPassword, username: data.username };
      try {
        const response = await api.patch(`user/${decodedToken.sub}`, userData);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Erro ao atualizar perfil"
          );
        }
        throw new Error("Erro ao atualizar perfil");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: (err: Error) => {
      setError(err.message || "Algo deu errado");
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isPending,
    error,
  };
}

export function useCreateCart() {
  const mutation = useMutation({
    mutationFn: async (data: createCartProps) => {
      try {
        const response = await api.post("cart/products", data);

        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Erro ao adicionar ao  carrinho"
          );
        }
        throw new Error("Erro ao adicionar ao  carrinho");
      }
    },
    onSuccess: () => {
      toast.success("Item adicionado ao carrinho!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      toast.error("Alogo deu errado!");
    },
  });
  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

async function fetchCart(): Promise<Cart> {
  const session = await getSession();
  if (!session) {
    throw new Error("Sessão não encontrada.");
  }

  try {
    const { data } = await api.get<Cart>("/cart");
    return data;
  } catch (error) {
    console.error("Erro ao buscar o carrinho:", error);
    throw new Error(
      "Falha ao obter os dados do carrinho. Tente novamente mais tarde."
    );
  }
}

export function useGetCart() {
  return useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    placeholderData: (previousData) => previousData ?? undefined,
  });
}

export function useCartActions() {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: async (data: AddProductProps) => {
      const response = await api.post("cart/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error(
        "Erro ao adicionar ao carrinho:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (productId: number) => {
      const response = await api.delete(`cart/products/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error(
        "Erro ao remover do carrinho:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const incrementQuantity = (productId: number, currentQuantity: number) => {
    return addToCart.mutate({ productId, quantity: currentQuantity + 1 });
  };

  const decrementQuantity = (productId: number, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      return removeFromCart.mutate(productId);
    }
    return addToCart.mutate({ productId, quantity: currentQuantity - 1 });
  };

  return {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    isLoading: addToCart.isPending || removeFromCart.isPending,
  };
}

async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await api.get("order");
    return res.data.orders;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw new Error("Falha ao obter os pedidos.");
  }
}

export function useGetOrders() {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    placeholderData: [],
  });
}

export function useCreateOrder() {
  const router = useRouter();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: CreateOrderProps) => {
      try {
        const response = await api.post("/order", data);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Erro ao criar pedido"
          );
        }
        throw new Error("Erro ao criar pedido");
      }
    },
    onSuccess: () => {
      router.push("/orders");
      toast.success("Pedido criado com sucesso!");
    },
    onError: (err: Error) => {
      setError(err.message || "Algo deu errado");
    },
  });
  return {
    createOrder: mutation.mutate,
  };
}

export function useCreateProduct() {
  const mutation = useMutation({
    mutationFn: async (data: CreateProductProps) => {
      try {
        const response = await api.post("/product", data);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Erro ao criar produto"
          );
        }
        throw new Error("Erro ao criar produto");
      }
    },
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
    },
    onError: (err: Error) => {
      toast.error("Algo deu errado");
    },
  });

  return {
    createProduct: mutation.mutate,
  };
}

export function useUpdateOrderStatus() {
  const mutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      try {
        const response = await api.patch(`/order/${data.orderId}/status`, {
          status: data.status,
        });
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Erro ao atualizar status do pedido"
          );
        }
        throw new Error("Erro ao atualizar status do pedido");
      }
    },
    onSuccess: () => {
      toast.success("Status do pedido atualizado com sucesso!");
    },
    onError: (err: Error) => {
      toast.error("Algo deu errado");
    },
  });

  return {
    updateOrderStatus: mutation.mutate,
  };
}
