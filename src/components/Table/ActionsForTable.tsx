"use client";
import { useLanguage } from "@/context/languageColorContext";
import React from "react";

const ActionsForTable = ({
  item,
  onDelete,
  handleEdit,
  ShowItem,
  itemNAme
}: {
  item: { _id: string };
  onDelete: ((id: string) => void) | undefined;
  handleEdit: (id: string) => void;
  ShowItem: (id: string) => void;
  itemNAme: string;
}) => {
  const { dataOflang, lang } = useLanguage();

  return (
    <td
      dir={lang === "AR" ? "rtl" : "ltr"}
      className="px-2 py-2 border border-gray-400 min-w-20  break-words m-0  ">
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <button
          onClick={() => handleEdit(item._id)}
          className="bg-blue-500 mb-1 w-16 text-white px-2 py-1  rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
          {dataOflang?.table.update || "تعديل"}
        </button>
        <button
          onClick={() => onDelete && onDelete(item._id)}
          className="bg-red-500  w-16 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs">
          {dataOflang?.table.delete || "حذف"}
        </button>
        <button
          onClick={() => ShowItem}
          className="bg-green-500 mt-1 w-16 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
          {dataOflang?.table.pageProduct || "صفحة"} {itemNAme}
        </button>
      </div>
    </td>
  );
};

export default ActionsForTable;
