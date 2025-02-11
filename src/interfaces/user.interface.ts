import { CartProduct, ProductOrder } from "./product.interface";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  picture?: string;
  orders: [];
  carts: [];
}

type UserType = {
  id: string;
  email: string;
  passwordHash: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  picture?: string;
  orders: [];
  carts: [];
};
