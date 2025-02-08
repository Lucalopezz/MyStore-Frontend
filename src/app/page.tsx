import { ProductList } from "@/components/product/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ProductList />
      </div>
    </div>
  );
}
