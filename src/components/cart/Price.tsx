"use client";
import { useTheme } from "@/context/themeContext";
import { Product } from "@/Types/ProductPart";
import { themeColors } from "@/utils/theme";

export const Price = ({ item }: { item: Product }) => {
  const { currentColor } = useTheme();

  return (
    <div className="flex items-start justify-start mb-2 flex-col">
      <span className="text-gray-600 line-through mr-2">{item.price} $</span>
      <span
        className={`text-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 font-bold`}
      >
        {item.discountedPrice} $
      </span>
    </div>
  );
};
