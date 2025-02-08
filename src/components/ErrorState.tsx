"use client";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <Card className="w-80 bg-gray-800 text-white border border-red-500">
        <CardContent>
          <p className="text-center text-red-400">
            {message || "Erro ao carregar produtos"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}