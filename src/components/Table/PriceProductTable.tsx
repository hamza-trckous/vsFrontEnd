"use client";
import { useLanguage } from "@/context/languageColorContext";
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
  const { dataOflang } = useLanguage();

  return (
    <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
      {item.price} {dataOflang?.addingProduct.da || "دج"}
      <br />{" "}
      {item.discountedPrice && item.discountedPrice > 0 && (
        <div className="text-green-600">
          {dataOflang?.dashboardProduct.priceAfterDiscount || "بعد التخفيض:"}{" "}
          {item.discountedPrice} {dataOflang?.addingProduct.da || "دج"}
        </div>
      )}
    </td>
  );
};

export default PriceProductTable;
