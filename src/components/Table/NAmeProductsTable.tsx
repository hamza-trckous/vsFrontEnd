import React from "react";

const NAmeProductsTable = ({ items }: { items: { name: string } }) => {
  return (
    <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
      {items.name}
    </td>
  );
};

export default NAmeProductsTable;
