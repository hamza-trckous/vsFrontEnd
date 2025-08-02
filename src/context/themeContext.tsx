/* eslint-disable */

"use client";
import { getSettingsProfile } from "@/api/profile";
import { ColorName } from "@/utils/theme";
import { setCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useState } from "react";

export type theme = {
  currentColor: ColorName | undefined;
  setcolor: React.Dispatch<React.SetStateAction<ColorName | undefined>>;
};
const ThemeContext = createContext<theme>({
  currentColor: "red",
  setcolor: () => {},
});

export const ThemeProvider = ({
  value,
  children,
}: {
  value: ColorName | undefined;
  children: React.ReactNode;
}) => {
  const [currentColor, setcolor] = useState(value);
  useEffect(() => {
    const bringColor = async () => {
      const settings = await getSettingsProfile();
      const newColor = settings.color;
      setcolor(settings.color);

      if (settings.color !== value) {
        setCookie("ColorText", newColor, {
          path: "/",
        });
      }
    };

    bringColor();
  }, [value]);

  return (
    <ThemeContext.Provider value={{ currentColor, setcolor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
