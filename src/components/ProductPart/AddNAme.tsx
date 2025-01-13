import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart"; // Adjust the import path as necessary

const AddNAme = ({
  register,
  errors,
}: {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
}) => {
  return (
    <>
      <input
        {...register("name", { required: "اسم المنتج مطلوب" })}
        type="text"
        placeholder="اسم المنتج"
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded text-right"
      />
      {errors.name && <p>{String(errors.name.message)}</p>}
    </>
  );
};

export default AddNAme;
