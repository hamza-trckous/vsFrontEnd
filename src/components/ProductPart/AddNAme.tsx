import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart"; // Adjust the import path as necessary
import { Category } from "@/Types/Categorys";
import { LanguageConfig } from "@/Types/LanguageConfig";
interface CommonFields {
  name: string;
}
interface AddNameProps {
  lang: "AR" | "EN" | undefined;
  nameOfInput: string;
  register: UseFormRegister<NewProduct> | UseFormRegister<Category>;
  errors: FieldErrors<NewProduct> | FieldErrors<Category>;
  dataOfLang: LanguageConfig | undefined;
}
const AddNAme: React.FC<AddNameProps> = ({
  lang,
  nameOfInput = " product",
  dataOfLang,
  register,
  errors,
}) => {
  return (
    <div
      className="m-2 flex flex-col content-center justify-center align-middle"
      dir={lang === "AR" ? "rtl" : "ltr"}
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {dataOfLang?.addingProduct.addingName || "إضافة اسم المنتج:"}
      </label>
      <input
        dir={lang === "AR" ? "rtl" : "ltr"}
        {...(register as unknown as UseFormRegister<CommonFields>)("name", {
          required: `name ${nameOfInput} required`,
        })}
        type="text"
        placeholder={`name of ${nameOfInput} `}
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded  w-full"
      />
      {errors.name && <p>{String(errors.name.message)}</p>}
    </div>
  );
};

export default AddNAme;
