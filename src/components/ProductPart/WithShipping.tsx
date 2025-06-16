import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues
} from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart";
import { LanguageConfig } from "@/Types/LanguageConfig";

interface WithShippingProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
  dataOflang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
}

const WithShipping: React.FC<WithShippingProps> = ({
  lang,
  register,
  errors,
  dataOflang
}) => {
  return (
    <div dir={lang === "AR" ? "rtl" : "ltr"} className="mb-4 ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="withShipping">
        {dataOflang?.addingProduct.withshipping || " هل يتضمن الشحن؟"}
      </label>
      <select
        id="withShipping"
        {...register("withShipping", {
          required: `${
            dataOflang?.addingProduct.requiredShipping || "معلومات الشحن مطلوبة"
          }`
        })}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors.withShipping ? "border-red-500" : ""
        }`}>
        <option value="">{dataOflang?.addingProduct.choise || " اختر"}</option>
        <option value={dataOflang?.addingProduct.yes || " نعم"}>
          {dataOflang?.addingProduct.yes || " نعم"}
        </option>
        <option value={dataOflang?.addingProduct.no || " لا"}>
          {" "}
          {dataOflang?.addingProduct.no || " لا"}
        </option>
      </select>
      {errors.withShipping && (
        <p className="text-red-500 text-xs italic">
          {errors.withShipping.message}
        </p>
      )}
    </div>
  );
};

export default WithShipping;
