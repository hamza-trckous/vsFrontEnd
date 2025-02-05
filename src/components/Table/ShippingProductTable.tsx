import React from "react";

const ShippingProductTable = ({
  product,
}: {
  product: { withShipping: string };
}) => {
  return (
    <td className="px-2 py-1 border border-gray-400  text-right break-words">
      {product.withShipping}
    </td>
  );
};

export default ShippingProductTable;
