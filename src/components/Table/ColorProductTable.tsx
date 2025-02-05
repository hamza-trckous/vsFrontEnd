import React from "react";

const ColorProductTable = ({
  item: { product },
}: {
  item: { product: { colors: string[] } };
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
      {product.colors.join(", ")}
    </td>
  );
};

export default ColorProductTable;
