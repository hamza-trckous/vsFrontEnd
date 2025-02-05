import { ProductWithreviews } from "@/Types/ProductPart";
import React from "react";

const PriceProductTable = ({
  item,
}: {
  item: {
    discountedPrice: ProductWithreviews["discountedPrice"];
    price: ProductWithreviews["price"];
  };
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
      دينار جزائري <br /> {item.price} دج
      <br />{" "}
      {item.discountedPrice && item.discountedPrice > 0 && (
        <div className="text-green-600">
          بعد التخفيض: {item.discountedPrice} دج
        </div>
      )}
    </td>
  );
};

export default PriceProductTable;
