import { Category } from "@/Types/Categorys";
import { NewProduct } from "@/Types/ProductPart";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form"; // Correct import statement

interface CommonFields {
  description: string;
}
const Description = ({
  nameOfInput = " المنتج",
  register,
  errors,
}: {
  nameOfInput?: string;
  register: UseFormRegister<NewProduct> | UseFormRegister<Category>;

  errors: FieldErrors<NewProduct> | FieldErrors<Category>;
}) => {
  return (
    <>
      <textarea
        {...(register as unknown as UseFormRegister<CommonFields>)(
          "description",
          { required: `وصف ${nameOfInput} مطلوب` }
        )}
        placeholder={`وصف ${nameOfInput}`}
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded col-span-2 text-right"></textarea>
      {errors.description && <p>{String(errors.description.message)}</p>}
    </>
  );
};

export default Description;
