import React from "react";

const RatingProductTable = ({
  item: { product },
}: {
  item: { product: { rating: number } };
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
      {"★".repeat(product.rating) + "☆".repeat(5 - product.rating)}
    </td>
  );
};

export default RatingProductTable;
