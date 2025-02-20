import { ShoppingCart } from "lucide-react";

export const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-400">Seu carrinho está vazio</h3>
      <p className="text-gray-500 mt-2">Adicione alguns produtos para começar</p>
    </div>
  );
};
