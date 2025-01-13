"use client";

import { NewProduct } from "@/Types/ProductPart";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

interface ColorProps {
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
}

const Color: React.FC<ColorProps> = ({
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [customColor, setCustomColor] = useState("");

  const [colors, setColors] = useState([
    "أحمر",
    "أزرق",
    "أخضر",
    "أصفر",
    "أسود",
    "أبيض",
  ]);

  useEffect(() => {
    const initialColors = getValues("colors");
    console.log("Initial colors:", initialColors);
    if (initialColors && initialColors.length > 0) {
      setColors(initialColors);
    }
    setValue("colors", initialColors);
  }, [getValues, setValue]);

  const handleAddColor = () => {
    if (customColor && !colors.includes(customColor)) {
      setColors([...colors, customColor]);
      setCustomColor("");
    }
  };

  return (
    <div className="mb-2">
      <label className="block text-right">الألوان:</label>
      <div className="flex flex-wrap">
        {colors.map((color) => (
          <label key={color} className="mr-2">
            <input
              type="checkbox"
              value={color}
              {...register("colors")}
              defaultChecked={getValues("colors").includes(color)}
              onChange={(e) => {
                const value = e.target.value;
                const updatedColors = e.target.checked
                  ? [...getValues("colors"), value]
                  : getValues("colors").filter((c) => c !== value);
                setValue("colors", updatedColors);
              }}
            />
            {color}
          </label>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          placeholder="أضف لونًا جديدًا"
        />
        <button
          type="button"
          onClick={handleAddColor}
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
          أضف
        </button>
      </div>
      {errors.colors && (
        <p className="text-red-500 text-xs mt-1">{errors.colors.message}</p>
      )}
    </div>
  );
};

export default Color;
