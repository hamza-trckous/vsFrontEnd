import React from "react";

const SizeProductTable = ({
  item: { product },
}: {
  item: { product: { sizes: string[] } };
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
      {product.sizes.join(", ")}
    </td>
  );
};

export default SizeProductTable;
