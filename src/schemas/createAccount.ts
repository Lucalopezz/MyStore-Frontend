import { z } from "zod";

export const createAccountSchema = z
  .object({
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
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
