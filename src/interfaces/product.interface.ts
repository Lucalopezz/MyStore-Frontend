export interface Product {
  id: number;
  name: string;
  description?: string; 
  price: number; 
  quantity: number;
  images: string; 
  createdAt: string; 
  updatedAt: string; 
  carts: CartProduct[]; 
  orders: ProductOrder[]; 
}

export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product; 
}

export interface ProductOrder {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
