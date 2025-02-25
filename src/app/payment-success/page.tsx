"use client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/useQueryClient";

import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const { toast } = useToast();
  const { createOrder } = useCreateOrder();
  const router = useRouter();

  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");

  const cartIdNumber = Number(cartId);

  if (isNaN(cartIdNumber)) {
    console.error("Cart ID inválido:", cartId);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Erro!</h1>
        <p className="text-lg">O ID do carrinho é inválido.</p>
      </div>
    );
  }

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!cartId || isNaN(cartIdNumber)) {
        console.error("Cart ID inválido ou não encontrado na URL.");
        return;
      }

      try {
        await createOrder({ cartId: cartIdNumber });

        toast({
          title: "Pedido criado com sucesso!",
          description:
            "Seu pagamento foi processado e o pedido foi registrado.",
        });

        setTimeout(() => {
          router.push("/orders");
        }, 3000); 
      } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        toast({
          title: "Erro ao criar o pedido",
          description:
            "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    };

    handlePaymentSuccess();
  }, [cartId, createOrder, toast, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Processando seu pedido...</h1>
      <p className="text-lg">Aguarde enquanto confirmamos seu pagamento.</p>
    </div>
  );
};

export default SuccessPage;
