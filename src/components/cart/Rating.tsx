import { Product } from "@/Types/ProductPart";
import { FaStar } from "react-icons/fa";

export const Rating = ({ item }: { item: Product }) => {
  return (
    <div className="flex items-center justify-start mb-2">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={index < item.rating ? "text-yellow-500" : "text-gray-300"}
          size={16}
        />
      ))}
    </div>
  );
};
