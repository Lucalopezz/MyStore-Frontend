"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../LoadingState";


const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 6 caracteres"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <LoadingState />;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <div>
          <Label htmlFor="email" className="text-gray-600">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            className={`w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-600">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className={`w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-blue-500 focus:ring-0"
              {...register("rememberMe")}
            />
            <Label htmlFor="rememberMe" className="ml-2 text-gray-600">
              Lembrar de mim
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-gray-950 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Entrar
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Não tem uma conta?{" "}
          <a href="#" className="text-gray-950">
            <b>Cadastre-se</b>
          </a>
        </p>
      </div>
    </div>
  );
}
