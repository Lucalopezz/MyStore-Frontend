import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

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
