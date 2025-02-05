import { Product } from "@/Types/ProductPart";

export const Price = ({ item }: { item: Product }) => {
  return (
    <div className="flex items-start justify-start mb-2 flex-col">
      <span className="text-gray-600 line-through mr-2">{item.price} $</span>
      <span className="text-teal-500 font-bold">{item.discountedPrice} $</span>
    </div>
  );
};
