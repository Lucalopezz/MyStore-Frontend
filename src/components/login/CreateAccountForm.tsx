"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoadingState } from "../LoadingState";
import Link from "next/link";
import {
  CreateAccountFormData,
  createAccountSchema,
} from "@/schemas/createAccount";
import { FormField } from "../form/FormField";
import { useCreateUser } from "@/hooks/useQueryClient";


export default function CreateAccountForm() {
  const { createUser, isLoading, error } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    createUser(data)
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Criar Conta
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <FormField
          label="Nome do Usuário"
          id="username"
          type="text"
          placeholder="Digite seu nome de usuário"
          error={errors.email?.message}
          register={register}
        />

        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          error={errors.email?.message}
          register={register}
        />

        <FormField
          label="Senha"
          id="password"
          type="password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          register={register}
        />
        <FormField
          label="Confirme sua senha"
          id="confirmPassword"
          type="password"
          placeholder="Digite sua senha novamente"
          error={errors.confirmPassword?.message}
          register={register}
        />

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
