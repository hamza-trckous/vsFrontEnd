import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart"; // Adjust the import path as necessary
import { Category } from "@/Types/Categorys";
interface CommonFields {
  name: string;
}
interface AddNameProps {
  nameOfInput: string;
  register: UseFormRegister<NewProduct> | UseFormRegister<Category>;
  errors: FieldErrors<NewProduct> | FieldErrors<Category>;
}
const AddNAme: React.FC<AddNameProps> = ({
  nameOfInput = " المنتج",
  register,
  errors,
}) => {
  return (
    <>
      <input
        {...(register as unknown as UseFormRegister<CommonFields>)("name", {
          required: `اسم ${nameOfInput} مطلوب`,
        })}
        type="text"
        placeholder={`اسم ${nameOfInput} `}
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded text-right"
      />
      {errors.name && <p>{String(errors.name.message)}</p>}
    </>
  );
};

export default AddNAme;
