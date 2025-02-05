import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingComp = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-teal-500 text-4xl mb-4" />
        <p className="text-teal-500 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingComp;
