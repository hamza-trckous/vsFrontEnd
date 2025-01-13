import { NewProduct } from "@/Types/ProductPart";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form"; // Correct import statement

const Description = ({
  register,
  errors,
}: {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
}) => {
  return (
    <>
      <textarea
        {...register("description", { required: "وصف المنتج مطلوب" })}
        placeholder="وصف المنتج"
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded col-span-2 text-right"></textarea>
      {errors.description && <p>{String(errors.description.message)}</p>}
    </>
  );
};

export default Description;
