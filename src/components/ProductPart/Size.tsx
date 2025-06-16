"use client";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { NewProduct } from "@/Types/ProductPart";
import { LanguageConfig } from "@/Types/LanguageConfig";

import ButtonSecondary from "./ButtonSecondary";

interface SizeProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
  dataOflang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
}

const Size: React.FC<SizeProps> = ({
  dataOflang,
  lang,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [customSize, setCustomSize] = useState("");
  const [sizes, setSizes] = useState([
    dataOflang?.addingProduct.Small || "صغير",
    dataOflang?.addingProduct.Medium || "متوسط",
    dataOflang?.addingProduct.Large || "كبير",
    dataOflang?.addingProduct.VeryLarge || "كبير جدًا",
    dataOflang?.addingProduct.Huge || "ضخم",
  ]);

  useEffect(() => {
    const initialSizes = getValues("sizes");
    if (initialSizes && initialSizes.length > 0) {
      setSizes(initialSizes);
    }
    setValue("sizes", initialSizes);
  }, [getValues, setValue]);

  const handleAddSize = () => {
    if (customSize && !sizes.includes(customSize)) {
      setSizes([...sizes, customSize]);
      setCustomSize("");
    }
  };

  return (
    <div dir={lang === "AR" ? "rtl" : "ltr"} className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {dataOflang?.addingProduct.sizes || " الأحجام:"}
      </label>
      <div className="flex flex-wrap">
        {sizes.map((size) => (
          <label key={size} className="mr-2">
            <input
              type="checkbox"
              value={size}
              {...register("sizes")}
              defaultChecked={getValues("sizes").includes(size)}
              onChange={(e) => {
                const value = e.target.value;
                setValue(
                  "sizes",
                  e.target.checked
                    ? [...getValues("sizes"), value]
                    : getValues("sizes").filter((s) => s !== value)
                );
              }}
            />
            {size}
          </label>
        ))}
      </div>
      <div className="flex mt-2">
        <ButtonSecondary
          lang={lang}
          TitleOfButton={`${
            dataOflang?.addingProduct.addingNewSize || "أضف حجمًا جديدًا"
          }`}
          handleAddSize={handleAddSize}
        />
        <input
          type="text"
          value={customSize}
          onChange={(e) => setCustomSize(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          placeholder={`${
            dataOflang?.addingProduct.addingNewSize || "أضف حجمًا جديدًا"
          }`}
        />
      </div>
      {errors.sizes && (
        <p className="text-red-500 text-xs mt-1">{errors.sizes.message}</p>
      )}
    </div>
  );
};

export default Size;
