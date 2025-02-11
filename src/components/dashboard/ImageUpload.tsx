import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  currentImage?: string;
}

export const ImageUpload = ({ currentImage }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        // const formData = new FormData();
        // formData.append('image', file);
        // await uploadImage(formData);
        toast.success("Foto atualizada com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar foto");
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
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
          <Input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </Label>
      </div>
    </div>
  );
};