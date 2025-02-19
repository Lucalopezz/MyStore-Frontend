"use client";
import React from "react";
import { useGetCart } from "@/hooks/useQueryClient";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { LoadingState } from "@/components/LoadingState";

export default function Cart() {
  const { data: cart, isLoading, error } = useGetCart();

  if (isLoading) <LoadingState/>

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">Erro ao carregar o carrinho.</p>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Carrinho de Compras
          </CardTitle>
        </CardHeader>

        <CardContent>
          {cart && cart.products.length > 0 ? (
            <div className="space-y-6">
              {cart.products.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.images || "/api/placeholder/96/96"}
                        alt={item.product?.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white truncate">
                            {item.product?.name}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {item.product?.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="text-lg font-medium text-white w-12 text-center bg-gray-800/80 py-1 rounded-md">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">
                            {formatPrice((item.product?.price || 0) * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatPrice(item.product?.price || 0)} cada
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span className="text-green-400">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400">Seu carrinho está vazio</h3>
              <p className="text-gray-500 mt-2">Adicione alguns produtos para começar</p>
            </div>
          )}
        </CardContent>

        {cart && cart.products.length > 0 && (
          <CardFooter className="pt-6">
            <Button className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-[1.02] rounded-xl">
              Finalizar Compra
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
