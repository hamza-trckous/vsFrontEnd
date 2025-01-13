import { NewProduct } from "@/Types/ProductPart";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const Price = ({
  register,
  errors,
}: {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
}) => {
  return (
    <div className="col-span-1">
      <label className="block mb-1 font-semibold text-xs">السعر</label>
      <input
        {...register("price", {
          required: "السعر مطلوب",
          valueAsNumber: true,
        })}
        type="number"
        placeholder="السعر (دينار جزائري)"
        required
        data-tribute="true"
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-right text-xs"
      />{" "}
      دج
      {errors.price && <p>{String(errors.price.message)}</p>}
    </div>
  );
};

export default Price;
