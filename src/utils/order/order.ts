import { Order } from "@/interfaces/order.interface";
import api from "../api";

export async function getOrders(): Promise<Order[]>  {
  try {
    const res = await api.get('order');
    return res.data.orders;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return [];
  }
}
