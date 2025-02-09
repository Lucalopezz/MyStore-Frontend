import { Card, CardContent } from "../ui/card";

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
}

export const ProductDetails = ({
  name,
  price,
  description,
}: ProductDetailsProps) => {
  return (
    <div className="w-full md:w-1/2 md:ml-20 md:mt-10">
      <Card className="bg-gray-900 shadow-md">
        <CardContent className="space-y-6 p-6">
          <h1 className="text-3xl font-bold text-white">{name}</h1>
          <p className="text-2xl font-semibold text-green-400">R$ {price}</p>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};
