import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Adiciona o token em todas as requisições
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }
  
  return config;
});

// Seu interceptor de resposta atual
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, callbackUrl: "/login" });
    }
    return Promise.reject(error);
  }
);

export default api;