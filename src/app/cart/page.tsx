"use client";

import { useCartActions, useGetCart } from "@/hooks/useQueryClient";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { LoadingState } from "@/components/LoadingState";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function Cart() {
  const { data: cart, isLoading, error } = useGetCart();
  const { removeFromCart, incrementQuantity, decrementQuantity, isLoading: isActionLoading } = useCartActions();

  if (isLoading) return <LoadingState />;

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
                <CartItem
                  key={item.id}
                  id={item.id}
                  product={item.product}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart.mutate(item.product.id)}
                  onIncrement={() => incrementQuantity(item.product.id, item.quantity)}
                  onDecrement={() => decrementQuantity(item.product.id, item.quantity)}
                />
              ))}

              <CartSummary subtotal={calculateTotal()} />
            </div>
          ) : (
            <EmptyCart />
          )}
        </CardContent>

        {cart && cart.products.length > 0 && (
          <CardFooter className="pt-6">
            <Button 
              className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-[1.02] rounded-xl"
              disabled={isActionLoading}
            >
              Finalizar Compra
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}