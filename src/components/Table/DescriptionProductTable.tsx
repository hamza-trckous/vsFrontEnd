import React, { useState } from "react";

const DescriptionProductTable = ({
  item,
}: {
  item: { description: string; _id: string };
}) => {
  const toggleShowMoreDescription = (id: string) => {
    setShowMoreDescription((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [showMoreDescription, setShowMoreDescription] = useState<{
    [key: string]: boolean;
  }>({});
  return (
    <td className="px-2 py-1 border border-gray-400 w-36 text-right break-words">
      <div
        className={`overflow-hidden ${
          showMoreDescription[item._id] ? "max-h-full" : "max-h-12"
        }`}>
        {item.description}
      </div>
      {item.description.length > 30 && (
        <button
          onClick={() => toggleShowMoreDescription(item._id)}
          className="text-blue-500 text-xs mt-1">
          {showMoreDescription[item._id] ? "عرض أقل" : "عرض المزيد"}
        </button>
      )}
    </td>
  );
};

export default DescriptionProductTable;
