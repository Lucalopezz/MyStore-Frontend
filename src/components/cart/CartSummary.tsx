import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";

interface CartSummaryProps {
  subtotal: number;
}

export const CartSummary = ({ subtotal }: CartSummaryProps) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
      <div className="space-y-4">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <Separator className="bg-gray-700" />
        <div className="flex justify-between text-lg font-bold text-white">
          <span>Total</span>
          <span className="text-green-400">{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
};