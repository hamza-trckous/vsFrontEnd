import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart";
import { LanguageConfig } from "@/Types/LanguageConfig";

interface DiscountPriceProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  dataOfLang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
}

const DiscountPrice: React.FC<DiscountPriceProps> = ({
  dataOfLang,
  lang,
  register,
  errors,
}) => {
  return (
    <div dir={lang === "AR" ? "rtl" : "ltr"} className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold m-2"
        htmlFor="discountedPrice">
        {dataOfLang?.addingProduct.priceAfterDiscount || "السعر بعد التخفيض "}
      </label>
      <input
        id="discountedPrice"
        type="number"
        {...register("discountedPrice", { valueAsNumber: true })}
        className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors.discountedPrice ? "border-red-500" : ""
        }`}
      />{" "}
      {dataOfLang?.addingProduct.da || "دج"}
      {errors.discountedPrice && (
        <p className="text-red-500 text-xs italic">
          {errors.discountedPrice.message}
        </p>
      )}
    </div>
  );
};

export default DiscountPrice;
