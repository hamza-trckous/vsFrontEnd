import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingComp = () => {
  const { currentColor } = useTheme();
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center w-full h-full min-h-screen z-50 bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-100 z-50`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <FaSpinner
          className={`animate-spin text-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-4xl mb-4`}
        />
        <p
          className={`text-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-lg`}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingComp;
