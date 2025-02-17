import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { updateProfileSchema, UpdateProfileData } from "@/schemas/profile";
import { FormField } from "../form/FormField";
import { useUpdateUser } from "@/hooks/useQueryClient";

interface ProfileFormProps {
  defaultValues: {
    username: string;
  };
}

export const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { error, updateUser } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: defaultValues.username,
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    updateUser(data, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
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
