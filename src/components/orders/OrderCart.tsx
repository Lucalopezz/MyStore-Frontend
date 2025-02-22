"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/interfaces/order.interface";
import { OrderProductCard } from "./OrderProductCard";
import {
  orderStatusColors,
  orderStatusLabels,
} from "@/utils/orderStatusConfig";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = order.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Pedido #{order.id}</p>
            <p className="text-gray-300">
              {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, 
              })}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Badge
      
              className={`px-4 py-1.5 font-medium rounded-full capitalize ${
                orderStatusColors[order.status]
              }`}
            >
              {orderStatusLabels[order.status]}
            </Badge>
            <p className="text-xl font-bold text-green-400">
              {totalAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3 mt-6">
            {order.products.map((productOrder) => (
              <OrderProductCard
                key={`${order.id}-${productOrder.productId}`}
                productOrder={productOrder}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={20} />
              <span>Ocultar detalhes</span>
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              <span>Ver detalhes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
