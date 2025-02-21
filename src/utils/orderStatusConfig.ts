// constants/orderStatusConfig.ts

import { OrderStatus } from "@/interfaces/order.interface";


export const orderStatusColors = {
  [OrderStatus.PROCESSANDO]: "bg-yellow-500/15 text-yellow-200 border-yellow-500/30",
  [OrderStatus.CONFIRMADO]: "bg-blue-500/15 text-blue-200 border-blue-500/30",
  [OrderStatus.ENVIADO]: "bg-purple-500/15 text-purple-200 border-purple-500/30",
  [OrderStatus.ENTREGUE]: "bg-green-500/15 text-green-200 border-green-500/30",
  [OrderStatus.CANCELADO]: "bg-red-500/15 text-red-200 border-red-500/30",
};

export const orderStatusLabels = {
  [OrderStatus.PROCESSANDO]: "Processando",
  [OrderStatus.CONFIRMADO]: "Confirmado",
  [OrderStatus.ENVIADO]: "Enviado",
  [OrderStatus.ENTREGUE]: "Entregue",
  [OrderStatus.CANCELADO]: "Cancelado",
};