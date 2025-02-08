"use client";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <Card className="w-80 bg-gray-800 text-white h-20 flex items-center justify-center">
        <CardContent>
          <p className="text-center "><b>Carregando...</b></p>
        </CardContent>
      </Card>
    </div>
  );
}