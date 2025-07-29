"use client";
import { useTheme } from "@/context/themeContext";
import { ColorName, themeColors } from "@/utils/theme";
import { setCookie } from "cookies-next";
import React from "react";

const ConfigColor = () => {
  const { setcolor, currentColor } = useTheme();
  return (
    <div className="w-full flex flex-col p-2 justify-between items-center">
      <label className="sm:text-xl text-md font-bold text-gray-700 m-2  ">
        chose a color
      </label>
      <div className="flex flex-wrap gap-2 m-2">
        {Object.keys(themeColors).map((color) => (
          <button
            key={color}
            onClick={() => {
              setCookie("ColorText", color);
              setcolor(color as ColorName);
            }}
            className={`bg-${color}-200 border  hover:bg-${color}-300 text-sm px-4 py-2 ${
              currentColor === color ? "border-black" : ""
            } rounded-md shadow transition-all`}>
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigColor;
