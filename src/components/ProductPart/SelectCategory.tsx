import { getCategories } from "@/api/category";
import { Category } from "@/Types/Categorys";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { NewProduct } from "@/Types/ProductPart";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
interface CommonFields {
  category: string;
}
const SelectCategory = ({
  lang,
  dataOfLang,
  register,
  errors,
  setSelectCategory
}: {
  lang: "AR" | "EN" | undefined;
  dataOfLang: LanguageConfig | undefined;
  register: UseFormRegister<NewProduct> | UseFormRegister<Category>;
  errors: FieldErrors<NewProduct> | FieldErrors<Category>;

  setSelectCategory: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}) => {
  const {
    data: categories,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  if (isLoading) {
  }

  if (isError && error) {
    console.error("Error:", error);
  }

  if (categories) {
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="category"
        className="block text-gray-700 text-sm font-bold m-2">
        {dataOfLang?.addingProduct.principalCategory || "التصنيف الرئيسي"}
      </label>
      <select
        dir={lang === "AR" ? "rtl" : "ltr"}
        defaultValue={""}
        {...(register as unknown as UseFormRegister<CommonFields>)("category", {
          required: `${
            dataOfLang?.addingProduct.requiredCategory ||
            "التصنيف الرئيسي مطلوب"
          }`,
          onChange: (e) => {
            const category = categories?.find(
              (category: Category) => category._id === e.target.value
            );
            setSelectCategory({
              id: category?._id || "",
              name: category?.name || ""
            });
          }
        })}
        id="category"
        className="border border-gray-300 rounded-md p-2">
        <option value="" disabled>
          Principal Category
        </option>
        {categories?.map((category: Category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {(errors as FieldErrors<CommonFields>).category && (
        <p className="text-red-500 text-xs italic">
          {(errors as FieldErrors<CommonFields>).category?.message}
        </p>
      )}
    </div>
  );
};

export default SelectCategory;
