"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

const ButtonSecondary = ({
  TitleOfButton,
  handleAddSize,
  lang,
}: {
  TitleOfButton: string;
  handleAddSize: () => void;
  lang: "AR" | "EN" | undefined;
}) => {
  const { currentColor } = useTheme();

  return (
    <button
      type="button"
      onClick={handleAddSize}
      className={` ${lang === "AR" ? "ml-2" : "mr-2"} bg-${
        themeColors[currentColor ?? "teal"]?.secondary
      }-500 text-white px-3 py-1 rounded hover:bg-${
        themeColors[currentColor ?? "teal"]?.secondary
      }-600 text-xs`}>
      {TitleOfButton}
    </button>
  );
};

export default ButtonSecondary;
