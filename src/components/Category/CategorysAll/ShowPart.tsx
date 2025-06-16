"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

const ShowPart = () => {
  const { currentColor } = useTheme();

  return (
    <div className="w-full h-screen flex flex-end  justify-end content-end">
      <div
        className={`h-screen bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 w-2/3 rounded-2xl ml-1/3`}></div>
    </div>
  );
};

export default ShowPart;
