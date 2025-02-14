import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import {
  updateProfilePictureData,
  updateProfilePictureSchema,
} from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadUserImage } from "@/hooks/useQueryClient";

interface ImageUploadProps {
  currentImage?: string;
}

export const ImageUpload = ({ currentImage }: ImageUploadProps) => {
  const currentImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}user/${currentImage}`;
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfilePictureSchema),
    defaultValues: {
      image: undefined as unknown as FileList,
    },
  });

  const { uploadImage, error } = useUploadUserImage(); 

  const handleImageUpload = async (data: updateProfilePictureData) => {
    const file = data.image[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); 
      };
      reader.readAsDataURL(file);

      uploadImage(data); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleImageUpload)}
      className="flex flex-col items-center space-y-4"
    >
      <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="w-full">
        <Label htmlFor="image" className="cursor-pointer">
          <div className="flex items-center justify-center space-x-2 p-2 border-2 border-dashed rounded-lg hover:border-gray-400 transition-colors">
            <Camera className="w-5 h-5" />
            <span>Alterar foto</span>
          </div>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => field.onChange(event.target.files)}
              />
            )}
          />
        </Label>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Salvar
      </button>
    </form>
  );
};
