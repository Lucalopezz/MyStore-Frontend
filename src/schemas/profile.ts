import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    newPassword: z
      .string()
      .min(8, "Nova senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export const updateProfilePictureSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Você deve selecionar uma imagem.")
    .refine((files) => {
      const file = files?.[0];
      return file?.type.startsWith("image/");
    }, "O arquivo deve ser uma imagem.")
    .refine((files) => {
      const file = files?.[0];
      return file?.size <= 5 * 1024 * 1024;
    }, "A imagem deve ter no máximo 5MB."),
});

export type updateProfilePictureData = z.infer<typeof updateProfilePictureSchema>;