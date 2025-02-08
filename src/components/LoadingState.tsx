"use client";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <Card className="w-80 bg-gray-800 text-white h-20 flex flex-col items-center">
        <CardContent>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-3"></div>
        </CardContent>
      </Card>
    </div>
  );
}