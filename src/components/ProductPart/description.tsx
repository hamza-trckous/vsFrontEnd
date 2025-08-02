import { LanguageConfig } from "@/Types/LanguageConfig";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"; // Correct import statement

interface CommonFields {
  description: string;
}
type DescriptionProps<T extends FieldValues> = {
  dataOflang: LanguageConfig | undefined;
  nameOfInput?: string;
  register: UseFormRegister<T>;
  lang: "AR" | "EN" | undefined;
  errors: FieldErrors<T>;
};
const Description = <T extends FieldValues>({
  dataOflang,
  nameOfInput = " product",
  register,
  errors,
  lang,
}: DescriptionProps<T>) => {
  return (
    <>
      <label
        dir={lang === "AR" ? "rtl" : "ltr"}
        className="block text-gray-700 text-sm font-bold m-2 col-span-2"
      >
        {dataOflang?.addingProduct.description || "وصف المنتج"}
      </label>
      <textarea
        dir={lang === "AR" ? "rtl" : "ltr"}
        {...(register as unknown as UseFormRegister<CommonFields>)(
          "description",
          { required: `description of  ${nameOfInput} required` },
        )}
        placeholder={`description of ${nameOfInput}`}
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded col-span-2 "
      ></textarea>
      {errors.description && <p>{String(errors.description.message)}</p>}
    </>
  );
};

export default Description;
