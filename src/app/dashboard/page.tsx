"use client";

import { useGetUser } from "@/hooks/useQueryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { OrdersSection } from "@/components/dashboard/OrdersSection";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

export default function Dashboard() {
  const { data: userData, isLoading, error } = useGetUser();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !userData) {
    return <ErrorState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Bem vindo, {userData.username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Dados do perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm defaultValues={{ username: userData.username }} />
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Foto do perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ImageUpload currentImage={userData.picture} />
          </CardContent>
        </Card>
      </div>

      <OrdersSection />
    </div>
  );
}
