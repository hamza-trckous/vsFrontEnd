"use client";

import { LanguageConfig } from "@/Types/LanguageConfig";
import { NewProduct } from "@/Types/ProductPart";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import ButtonSecondary from "./ButtonSecondary";

interface ColorProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
  dataOflang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
}

const Color: React.FC<ColorProps> = ({
  dataOflang,
  lang,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [customColor, setCustomColor] = useState("");

  const [colors, setColors] = useState([
    dataOflang?.addingProduct.Red || "أحمر",
    dataOflang?.addingProduct.Blue || "أزرق",
    dataOflang?.addingProduct.Green || "أخضر",
    dataOflang?.addingProduct.Yellow || "أصفر",
    dataOflang?.addingProduct.Black || "أسود",
    dataOflang?.addingProduct.White || "أبيض",
  ]);

  useEffect(() => {
    const initialColors = getValues("colors");
    if (initialColors && initialColors.length > 0) {
      setColors(initialColors);
    }
    setValue("colors", initialColors);
  }, [getValues, setValue]);

  const handleAddColor = () => {
    if (customColor && !colors.includes(customColor)) {
      setColors([...colors, customColor]);
      setCustomColor("");
    }
  };

  return (
    <div dir={lang === "AR" ? "rtl" : "ltr"} className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {dataOflang?.addingProduct.color || "الألوان:"}
      </label>
      <div className="flex flex-wrap">
        {colors.map((color) => (
          <label key={color} className="mr-2">
            <input
              type="checkbox"
              value={color}
              {...register("colors")}
              defaultChecked={getValues("colors").includes(color)}
              onChange={(e) => {
                const value = e.target.value;
                const updatedColors = e.target.checked
                  ? [...getValues("colors"), value]
                  : getValues("colors").filter((c) => c !== value);
                setValue("colors", updatedColors);
              }}
            />
            {color}
          </label>
        ))}
      </div>
      <div className="flex mt-2">
        <ButtonSecondary
          lang={lang}
          TitleOfButton={`${
            dataOflang?.addingProduct.addingNewColor || "أضف لونًا جديدًا"
          }`}
          handleAddSize={handleAddColor}
        />
        <input
          type="text"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          placeholder={`${
            dataOflang?.addingProduct.addingNewColor || "أضف لونًا جديدًا"
          }`}
        />
      </div>
      {errors.colors && (
        <p className="text-red-500 text-xs mt-1">{errors.colors.message}</p>
      )}
    </div>
  );
};

export default Color;
