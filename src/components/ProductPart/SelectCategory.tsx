import { getCategories } from "@/api/category";
import { Category } from "@/Types/Categorys";
import { NewProduct } from "@/Types/ProductPart";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "react-query";
interface CommonFields {
  category: string;
}
const SelectCategory = ({
  register,
  errors,
  setSelectCategory,
}: {
  register: UseFormRegister<NewProduct> | UseFormRegister<Category>;
  errors: FieldErrors<NewProduct> | FieldErrors<Category>;

  setSelectCategory: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(categories);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="text-sm font-medium">
        التصنيف الرئيسي
      </label>
      <select
        defaultValue={""}
        {...(register as unknown as UseFormRegister<CommonFields>)("category", {
          required: "التصنيف الرئيسي مطلوب",
          onChange: (e) => {
            const category = categories?.find(
              (category: Category) => category._id === e.target.value
            );
            setSelectCategory({
              id: category?._id || "",
              name: category?.name || "",
            });
          },
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
