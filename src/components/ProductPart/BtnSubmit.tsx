import React from "react";

const BtnSubmit = ({ BtnName }: { BtnName: string }) => {
  return (
    <button
      type="submit"
      className="mt-2 bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-xs"
      data-tribute="true">
      {BtnName}
    </button>
  );
};

export default BtnSubmit;
