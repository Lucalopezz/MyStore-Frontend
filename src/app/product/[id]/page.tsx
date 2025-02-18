import { ErrorState } from "@/components/ErrorState";
import { ProductDetails } from "@/components/product/ProductDetails";
import { Product } from "@/interfaces/product.interface";
import { getProductById } from "@/lib/product/product";
import Image from "next/image";

import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: Product = await getProductById(id);

  if (!product) return <ErrorState message="Erro ao carregar produtos" />;

  const lowStockWarning =
    product.quantity < 5 ? (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          Atenção: Apenas {product.quantity}{" "}
          {product.quantity === 1 ? "unidade" : "unidades"} em estoque!
        </AlertDescription>
      </Alert>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4">
      <main className="mx-auto max-w-7xl">
        {lowStockWarning}
        <div className="bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                {product.images && product.images.length > 0 ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={product.images}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-gray-600 rounded-xl">
                    <p className="text-gray-400">Imagem indisponível</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <ProductDetails
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description || "Sem descrição"}
                quantity={product.quantity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
