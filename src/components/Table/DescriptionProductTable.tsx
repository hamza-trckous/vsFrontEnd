"use client";
import { useLanguage } from "@/context/languageColorContext";
import { Category } from "@/Types/Categorys";
import { NewProduct } from "@/Types/ProductPart";
import React, { useState } from "react";

const DescriptionProductTable = ({ item }: { item: Category | NewProduct }) => {
  const toggleShowMoreDescription = (id: string) => {
    setShowMoreDescription((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const { dataOflang } = useLanguage();

  const [showMoreDescription, setShowMoreDescription] = useState<{
    [key: string]: boolean;
  }>({});
  return (
    <td className="px-2 py-1 border border-gray-400 w-36 text-right break-words">
      <div
        className={`overflow-hidden ${
          showMoreDescription[item._id || ""] ? "max-h-full" : "max-h-12"
        }`}>
        {item.description}
      </div>
      {item.description.length > 30 && (
        <button
          onClick={() => toggleShowMoreDescription(item._id || "")}
          className="text-blue-500 text-xs mt-1">
          {showMoreDescription[item._id || ""]
            ? `${dataOflang?.table?.Showless || "عرض أقل"}`
            : `${dataOflang?.table?.Showmore || "عرض المزيد"}`}
        </button>
      )}
    </td>
  );
};

export default DescriptionProductTable;
