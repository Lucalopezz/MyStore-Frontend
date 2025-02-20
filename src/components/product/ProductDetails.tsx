"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCreateCart } from "@/hooks/useQueryClient";
import { formatPrice } from "@/utils/format";

interface ProductDetailsProps {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export const ProductDetails = ({
  id,
  name,
  price,
  description,
  quantity,
}: ProductDetailsProps) => {
  const { data: session } = useSession(); 
  const [isAdded, setIsAdded] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { updateUser, isLoading } = useCreateCart();

  const handleAddToCart = () => {
    if (!session) return; 

    const cartData = {
      productId: id,
      quantity: cartQuantity,
    };
    updateUser(cartData);

    if (!isLoading) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        setCartQuantity(1);
      }, 2000);
    }
  };

  const increaseQuantity = () => {
    if (cartQuantity < quantity) {
      setCartQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = (price * cartQuantity).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700">
      <div className="p-8 h-full flex flex-col">
        <div className="flex-grow space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {name}
              </h1>
              <Badge
                variant="secondary"
                className={`text-base px-4 py-1.5 font-medium rounded-full whitespace-nowrap 
                  ${
                    quantity <= 5
                      ? "bg-red-500/15 text-red-200 border border-red-500/30"
                      : "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                  }`}
              >
                {quantity} em estoque
              </Badge>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-green-400">
                  R$ {formatPrice(price)}
                </p>
                {cartQuantity > 1 && (
                  <p className="text-sm text-gray-400">
                    Total: R$ {totalPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Quantidade:</span>
              <div className="flex items-center gap-3">
                <Button
                  onClick={decreaseQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                  disabled={cartQuantity <= 1 || isAdded}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="text-lg font-medium text-white w-12 text-center bg-gray-800/80 py-1 rounded-md">
                  {cartQuantity}
                </span>

                <Button
                  onClick={increaseQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                  disabled={cartQuantity >= quantity || isAdded}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button
            onClick={handleAddToCart}
            disabled={!session || isAdded || quantity === 0}
            className={`w-full h-14 text-lg font-semibold transition-all duration-300 
              hover:scale-102 disabled:opacity-50 rounded-xl
              ${
                quantity === 0
                  ? "bg-red-600 hover:bg-red-700"
                  : session
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
          >
            {session ? (
              isAdded ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Adicionado ao Carrinho!
                </span>
              ) : quantity === 0 ? (
                "Produto Esgotado"
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </span>
              )
            ) : (
              "Faça login para adicionar ao carrinho"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
