import React from "react";

const ButtonCreatPolicy = ({
  handleCreate,
}: {
  handleCreate: () => Promise<void>;
}) => {
  return (
    <button
      onClick={handleCreate}
      className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full">
      إنشاء
    </button>
  );
};

export default ButtonCreatPolicy;
