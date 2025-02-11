import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export const OrdersSection = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meus Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href="/orders">
          <Button className="w-full flex items-center justify-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Ver meus pedidos</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};