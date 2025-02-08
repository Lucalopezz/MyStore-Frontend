import { ErrorState } from "@/components/ErrorState";
import { ProductDetails } from "@/components/product/ProductDetails";
import { Product } from "@/interfaces/product.interface";
import { getProductById } from "@/lib/product/product";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: Product = await getProductById(id);

  if (!product) return <ErrorState message="Erro ao carregar produtos" />;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-800 pt-8">
      <main className="flex flex-col md:flex-row gap-10 bg-gray-700 p-8 rounded-xl shadow-lg w-11/12 max-w-5xl">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
              <p className="text-gray-500">Imagem indisponível</p>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <ProductDetails
            name={product.name}
            price={product.price}
            description={product.description || "Sem descrição"}
          />
        </div>
      </main>
    </div>
  );
}
