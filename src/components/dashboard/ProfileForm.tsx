import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { updateProfileSchema, UpdateProfileData } from "@/schemas/profile";
import toast from "react-hot-toast";
import { FormField } from "../form/FormField";

interface ProfileFormProps {
  defaultValues: {
    username: string;
  };
}

export const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: defaultValues.username,
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      // Implementar a lógica de atualização aqui
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Nome de usuário"
        id="username"
        type="text"
        placeholder="Digite seu nome de usuário"
        error={errors.username?.message}
        register={register}
      />

      <FormField
        label="Nova senha"
        id="newPassword"
        type="password"
        placeholder="Digite sua nova senha"
        error={errors.newPassword?.message}
        register={register}
      />
      <FormField
        label="Digite novamente a senha"
        id="confirmPassword"
        type="password"
        placeholder="Digite sua nova novamente senha"
        error={errors.confirmPassword?.message}
        register={register}
      />

      <Button type="submit" className="w-full">
        Atualizar perfil
      </Button>
    </form>
  );
};