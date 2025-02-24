import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/product.interface";
import { formatPrice } from "@/utils/format";
import { Trash2, Plus, Minus } from "lucide-react";



interface CartItemProps {
  id: number;
  product?: Product;
  quantity: number;
  onRemove?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const CartItem = ({
  product,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  if (!product) return null;
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.images}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {product.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
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
                onClick={onDecrement}
                className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="text-lg font-medium text-white w-12 text-center bg-gray-800/80 py-1 rounded-md">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={onIncrement}
                className="h-8 w-8 rounded-lg border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-green-400">
                {formatPrice(product.price * quantity)}
              </p>
              <p className="text-sm text-gray-400">
                {formatPrice(product.price * 1)} cada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
