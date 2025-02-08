"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Product } from "@/interfaces/product.interface";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
    </Card>
  );
}