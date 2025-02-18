"use client";
import { useGetCart } from "@/hooks/useQueryClient";
import React from "react";

export default function Cart() {
  const { data: cart, isLoading, error } = useGetCart();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar o carrinho.</p>;

  return (
    <div>
      <h1>Carrinho</h1>
      {cart ? (
        <>
          <h2>Id do carrinho: {cart.id}</h2>
          <ul>
            {cart.products.map((product) => (
              <li key={product.id}>
                Produto ID: {product.productId} - Quantidade: {product.quantity}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Carrinho vazio.</p>
      )}
    </div>
  );
}
