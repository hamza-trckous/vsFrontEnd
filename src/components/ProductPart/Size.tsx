"use client";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { NewProduct } from "@/Types/ProductPart";

interface SizeProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
}

const Size: React.FC<SizeProps> = ({
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [customSize, setCustomSize] = useState("");
  const [sizes, setSizes] = useState([
    "صغير",
    "متوسط",
    "كبير",
    "كبير جدًا",
    "ضخم",
  ]);

  useEffect(() => {
    const initialSizes = getValues("sizes");
    if (initialSizes && initialSizes.length > 0) {
      setSizes(initialSizes);
    }
    setValue("sizes", initialSizes);
  }, [getValues, setValue]);

  const handleAddSize = () => {
    if (customSize && !sizes.includes(customSize)) {
      setSizes([...sizes, customSize]);
      setCustomSize("");
    }
  };

  return (
    <div className="mb-2">
      <label className="block text-right">الأحجام:</label>
      <div className="flex flex-wrap">
        {sizes.map((size) => (
          <label key={size} className="mr-2">
            <input
              type="checkbox"
              value={size}
              {...register("sizes")}
              defaultChecked={getValues("sizes").includes(size)}
              onChange={(e) => {
                const value = e.target.value;
                setValue(
                  "sizes",
                  e.target.checked
                    ? [...getValues("sizes"), value]
                    : getValues("sizes").filter((s) => s !== value)
                );
              }}
            />
            {size}
          </label>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={customSize}
          onChange={(e) => setCustomSize(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          placeholder="أضف حجمًا جديدًا"
        />
        <button
          type="button"
          onClick={handleAddSize}
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
          أضف
        </button>
      </div>
      {errors.sizes && (
        <p className="text-red-500 text-xs mt-1">{errors.sizes.message}</p>
      )}
    </div>
  );
};

export default Size;
