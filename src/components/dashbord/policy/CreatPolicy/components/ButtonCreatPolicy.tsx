"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React from "react";

const ButtonCreatPolicy = ({
  handleCreate,
}: {
  handleCreate: () => Promise<void>;
}) => {
  const { currentColor } = useTheme();

  return (
    <button
      onClick={handleCreate}
      className={`bg-${
        themeColors[currentColor ?? "teal"]?.basics
      }-500 text-white px-4 py-2 rounded-lg w-full`}
    >
      إنشاء
    </button>
  );
};

export default ButtonCreatPolicy;
