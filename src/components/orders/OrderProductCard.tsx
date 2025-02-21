"use client";

import { useEffect, useState } from "react";
import { Product, ProductOrder } from "@/interfaces/product.interface";
import { getProductById } from "@/utils/product/product";
import Image from "next/image";

interface OrderProductCardProps {
  productOrder: ProductOrder;
}

export const OrderProductCard = ({ productOrder }: OrderProductCardProps) => {
  const { productId, quantity } = productOrder;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(productId).then(setProduct);
  }, [productId]);

  if (!product) {
    return <p className="text-gray-400">Carregando...</p>;
  }

  return (
    <div className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
      <div className="relative h-16 w-16 rounded-md overflow-hidden">
        <Image 
          src={product.images} 
          alt={product.name}
          className="object-cover"
          fill
          sizes="64px"
        />
      </div>
      <div className="flex-grow">
        <h4 className="text-white font-medium">{product.name}</h4>
        <p className="text-gray-400 text-sm">
          Quantidade: {quantity}
        </p>
      </div>
      <p className="text-green-400 font-semibold">
        {product.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
      </p>
    </div>
  );
};
