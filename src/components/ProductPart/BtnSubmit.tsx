"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

const BtnSubmit = ({ BtnName }: { BtnName: string }) => {
  const { currentColor } = useTheme();

  return (
    <div className="w-full flex flex-col justify-center items-center m-4">
      <button
        type="submit"
        className={`mt-2  w-[30%] bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 text-white px-3 py-1 rounded-lg hover:bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-600 transition-colors duration-200 text-xs`}
        data-tribute="true">
        {BtnName}
      </button>
    </div>
  );
};

export default BtnSubmit;
