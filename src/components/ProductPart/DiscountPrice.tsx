import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart";

interface DiscountPriceProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
}

const DiscountPrice: React.FC<DiscountPriceProps> = ({ register, errors }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="discountedPrice">
        السعر بعد التخفيض
      </label>
      <input
        id="discountedPrice"
        type="number"
        {...register("discountedPrice", { valueAsNumber: true })}
        className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors.discountedPrice ? "border-red-500" : ""
        }`}
      />{" "}
      دج
      {errors.discountedPrice && (
        <p className="text-red-500 text-xs italic">
          {errors.discountedPrice.message}
        </p>
      )}
    </div>
  );
};

export default DiscountPrice;
