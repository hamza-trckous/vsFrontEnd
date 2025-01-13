import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { NewProduct } from "../../Types/ProductPart";

interface WithShippingProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
}

const WithShipping: React.FC<WithShippingProps> = ({ register, errors }) => {
  return (
    <div className="mb-4 ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="withShipping">
        هل يتضمن الشحن؟
      </label>
      <select
        id="withShipping"
        {...register("withShipping", { required: "هذا الحقل مطلوب" })}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors.withShipping ? "border-red-500" : ""
        }`}>
        <option value="">اختر</option>
        <option value="نعم">نعم</option>
        <option value="لا">لا</option>
      </select>
      {errors.withShipping && (
        <p className="text-red-500 text-xs italic">
          {errors.withShipping.message}
        </p>
      )}
    </div>
  );
};

export default WithShipping;
