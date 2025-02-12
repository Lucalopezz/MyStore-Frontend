"use client";

import { useAuth } from "@/hooks/useLogin";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingState } from "../LoadingState";
import { FormField } from "../form/FormField";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const { handleLogin, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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

  if (loading) return <LoadingState />;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          error={errors.email?.message}
          register={register}
        />

        <div className="relative">
          <FormField
            label="Senha"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            error={errors.password?.message}
            register={register}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
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
          <Link href="/create-account" className="text-gray-950">
            <b>Crie uma</b>
          </Link>
        </p>
      </div>
    </div>
  );
}
