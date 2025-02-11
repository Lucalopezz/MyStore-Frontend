import { z } from "zod";

export const updateProfileSchema = z.object({
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    newPassword: z.string().min(8, "Nova senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória")
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
  

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;