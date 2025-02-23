import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser maior que 0'),
  quantity: z.number().int().min(0, 'Quantidade deve ser maior que 0'),
  images: z.string().url('Imagem deve ser uma URL válida'),
});

export type ProductFormData = z.infer<typeof productSchema>;


export const OrderStatus = z.enum([
  'processando',
  'confirmado',
  'enviado',
  'entregue',
  'cancelado',
]);

export const orderSchema = z.object({
  orderId: z.string().min(1, 'ID do pedido é obrigatório'),
  status: OrderStatus,
});

export type OrderFormData = z.infer<typeof orderSchema>;