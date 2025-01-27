import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LandingEditingProps } from "@/Types/LandingEditing";

const AddTitle = ({
  register,
  errors,
  onchange,
  value,
}: {
  register: UseFormRegister<LandingEditingProps>;
  errors: FieldErrors<LandingEditingProps>;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  return (
    <>
      <input
        {...register("title", { required: " العنوان مطلوب" })}
        type="text"
        placeholder="عنوان "
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded text-right"
        onChange={onchange}
        value={value}
      />
      {errors.title && <p>{String(errors.title.message)}</p>}
    </>
  );
};

export default AddTitle;
