"use client";
import { useTheme } from "@/context/themeContext";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { NewProduct } from "@/Types/ProductPart";
import { themeColors } from "@/utils/theme";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const Price = ({
  lang,
  register,
  errors,
  dataOfLang,
}: {
  lang: "AR" | "EN" | undefined;
  dataOfLang: LanguageConfig | undefined;
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
}) => {
  const { currentColor } = useTheme();

  return (
    <div
      dir={lang === "AR" ? "rtl" : "ltr"}
      className="block text-gray-700 text-sm font-bold m-2">
      <label className="block text-gray-700 text-sm font-bold mb-2 col-span-1">
        {dataOfLang?.addingProduct.price || "السعر"}
      </label>
      <input
        {...register("price", {
          required: " price required ",
          valueAsNumber: true,
        })}
        type="number"
        placeholder="price of product "
        required
        data-tribute="true"
        className={`p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500  text-xs`}
      />{" "}
      {dataOfLang?.addingProduct.da || "دج"}
      {errors.price && <p>{String(errors.price.message)}</p>}
    </div>
  );
};

export default Price;
