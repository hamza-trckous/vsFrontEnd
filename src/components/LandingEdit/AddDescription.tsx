import { LandingEditingProps } from "@/Types/LandingEditing";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form"; // Correct import statement

const AddDescription = ({
  register,
  errors,
  onchange,
  value,
}: {
  register: UseFormRegister<LandingEditingProps>;
  errors: FieldErrors<LandingEditingProps>;
  onchange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}) => {
  return (
    <>
      <textarea
        {...register("description", { required: "وصف  مطلوب" })}
        placeholder="وصف "
        onChange={onchange}
        value={value}
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded col-span-2 text-right"
      ></textarea>
      {errors.description && <p>{String(errors.description.message)}</p>}
    </>
  );
};

export default AddDescription;
