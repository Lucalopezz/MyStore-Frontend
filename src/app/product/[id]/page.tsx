import { ErrorState } from "@/components/ErrorState";
import { Product } from "@/interfaces/product.interface";
import { getProductById } from "@/lib/product/product";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product: Product = await getProductById(params.id);

  if (!product) return <ErrorState message="Erro ao carregar produtos" />;

  return (
    <div >
      
    </div>
  );
}
