"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

function SideBarCategory() {
  const { currentColor } = useTheme();

  return (
    <div
      className={`h-screen bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-500 w-1/4 mr-10 rounded-2xl absolute `}></div>
  );
}

export default SideBarCategory;
