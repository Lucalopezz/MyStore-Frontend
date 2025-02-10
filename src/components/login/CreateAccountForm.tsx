"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingState } from "../LoadingState";
import Link from "next/link";

const createAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário deve ter no mínimo 3 caracteres")
    .max(20, "Nome de usuário deve ter no máximo 20 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export default function CreateAccountForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    setLoading(true);
    try {
     console.log(data)
    } catch (error) {
      setError("Ocorreu um erro ao criar a conta");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Criar Conta
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        
        <div>
          <Label htmlFor="username" className="text-gray-600">
            Nome de Usuário
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Digite seu nome de usuário"
            className={`w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username")}
          />
          {errors.username && (
            <span className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

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

        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-gray-950 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Criar Conta
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-gray-950">
            <b>Faça login</b>
          </Link>
        </p>
      </div>
    </div>
  );
}