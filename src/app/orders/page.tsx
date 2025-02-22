'use client'
import { PackageOpen } from "lucide-react";
import { OrderCard } from "@/components/orders/OrderCart";
import { useGetOrders } from "@/hooks/useQueryClient";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";


export default function Orders() {
  const { data: orders = [], isLoading, isError } = useGetOrders();

  if (isLoading) {
    return <LoadingState/>
  }

  if (isError) {
    return <ErrorState />
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <PackageOpen className="h-8 w-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Meus Pedidos</h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <p className="text-gray-400">Você ainda não tem pedidos.</p>
          </div>
        )}
      </div>
    </div>
  );
}