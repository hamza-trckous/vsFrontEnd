"use client";
import FirstLineOfTable from "@/components/Table/FirstLine";
import React from "react";
import BodyOFTableCategory from "./BodyOFTable";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";
import { TableTitlesCategory } from "@/utils/Table/Table";

const TableCategory = () => {
  const { currentColor } = useTheme();
  const items = TableTitlesCategory();
  return (
    <table
      className={`w-full table-fixed border-collapse text-sm bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-50`}
    >
      <FirstLineOfTable tableTitles={items} />
      <BodyOFTableCategory />
    </table>
  );
};

export default TableCategory;
