import { CartProduct, ProductOrder } from "./product.interface";
import { User } from "./user.interface";

export enum OrderStatus {
  PROCESSANDO = "processando",
  CONFIRMADO = "confirmado",
  ENVIADO = "enviado",
  ENTREGUE = "entregue",
  CANCELADO = "cancelado",
}

export interface Order {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  userId: string;
  user: User;
  products: ProductOrder[];
}

export interface Cart {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  products: CartProduct[];
}
