import React from "react";

const ActionsForTable = ({
  item,
  onDelete,
  handleEdit,
  ShowItem,
  itemNAme,
}: {
  item: { _id: string };
  onDelete: ((id: string) => void) | undefined;
  handleEdit: (id: string) => void;
  ShowItem: (id: string) => void;
  itemNAme: string;
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400 min-w-20 text-right break-words flex flex-col items-center ">
      <button
        onClick={() => handleEdit(item._id)}
        className="bg-blue-500 mb-1 w-16 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
        تعديل
      </button>
      <button
        onClick={() => onDelete && onDelete(item._id)}
        className="bg-red-500  w-16 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs ml-2">
        حذف
      </button>
      <button
        onClick={() => ShowItem}
        className="bg-green-500 mt-1 w-16 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
        صفحة {itemNAme}
      </button>
    </td>
  );
};

export default ActionsForTable;
