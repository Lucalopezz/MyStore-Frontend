import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    newPassword: z
      .string()
      .optional()
      .transform((e) => (e === "" ? undefined : e))
      .pipe(
        z
          .string()
          .min(8, "Nova senha deve ter no mínimo 8 caracteres")
          .optional()
      ),
    confirmPassword: z
      .string()
      .optional()
      .transform((e) => (e === "" ? undefined : e))
  })
  .refine(
    (data) => {
      if (!data.newPassword) return true;
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.confirmPassword) return false;
      if (!data.newPassword && data.confirmPassword) return false;
      return true;
    },
    {
      message: "Ambos os campos de senha devem ser preenchidos",
      path: ["confirmPassword"],
    }
  );

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