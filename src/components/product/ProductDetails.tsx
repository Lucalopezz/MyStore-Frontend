"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export const ProductDetails = ({
  name,
  price,
  description,
  quantity,
}: ProductDetailsProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formattedPrice = price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  quantity = 4;
  return (
    <div className="h-full bg-gray-800 rounded-md">
      <div className="p-8 h-full flex flex-col">
        <div className="flex-grow space-y-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {name}
            </h1>
            <Badge
              variant="secondary"
              className={`text-base px-3 py-1 whitespace-nowrap ${
                quantity <= 5 ? "bg-red-500/20 text-red-200 hover:text-red-800" : ""
              }`}
            >
              {quantity} em estoque
            </Badge>
          </div>

          <p className="text-3xl font-bold text-green-400">
            R$ {formattedPrice}
          </p>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={handleAddToCart}
            disabled={isAdded || quantity === 0}
            className="w-full h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
            variant={quantity === 0 ? "destructive" : "default"}
          >
            {isAdded ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Adicionado!
              </span>
            ) : quantity === 0 ? (
              "Produto Esgotado"
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
