"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

interface BodyOfTableProps {
  children: React.ReactNode;
}

const BodyOfTableOfProductPart = ({ children }: BodyOfTableProps) => {
  const { currentColor } = useTheme();

  return (
    <table
      className={`w-full table-fixed border-collapse text-sm bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-50`}>
      {children}
    </table>
  );
};

export default BodyOfTableOfProductPart;
