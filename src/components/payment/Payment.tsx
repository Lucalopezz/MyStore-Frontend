import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentDialog = ({ product, isOpen, onClose, onPaymentSuccess }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          price: product.price,
          name: product.name,
        }),
      });

      const { sessionUrl, sessionId } = await response.json();

      if (sessionUrl) {
        localStorage.setItem("stripeSessionId", sessionId);

        if (onPaymentSuccess) {
          onPaymentSuccess();
        }

        window.location.href = sessionUrl;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description:
          "Não foi possível processar seu pagamento. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Pagamento</DialogTitle>
          <DialogDescription>
            Você está finalizando a compra no valor de R${" "}
            {product?.price?.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Você será redirecionado para a página segura do Stripe para
            completar seu pagamento.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handlePayment} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Pagar Agora"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
