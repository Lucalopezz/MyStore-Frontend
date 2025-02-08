export interface Product {
  id: number;
  name: string;
  description?: string; // Campo opcional
  price: number; // Representado como número no frontend
  quantity: number;
  images: string; 
  createdAt: string; 
  updatedAt: string; // ISO string de data
  carts: CartProduct[]; // Associado a CartProduct[]
  orders: ProductOrder[]; // Associado a ProductOrder[]
}

export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface ProductOrder {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
