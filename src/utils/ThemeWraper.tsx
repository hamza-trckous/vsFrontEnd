"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { ThemeProvider } from "@/context/themeContext";
import { ColorName } from "./theme";

const ThemeWraper = ({
  children,
  initialColor
}: {
  children: ReactNode;
  initialColor: ColorName;
}) => {
  const [color, setColor] = useState<ColorName | undefined>(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  return <ThemeProvider value={color}>{children}</ThemeProvider>;
};

export default ThemeWraper;
