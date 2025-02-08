"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product.interface";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Card className="bg-gray-800 text-white shadow-md">
      <img
        src={product.images}
        alt={product.name}
        className="w-full h-50 object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-2">{product.description}</p>
        <p className="font-semibold">R$ {product.price}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push(`/product/${product.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          Ver mais
        </Button>
      </CardFooter>
    </Card>
  );
}
