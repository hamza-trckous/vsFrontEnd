"use client";
import React, { useState, useEffect } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { NewProduct } from "@/Types/ProductPart";

const Ration = ({
  register,
  setValue,
  errors,
  getValues,
}: {
  register: UseFormRegister<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  errors: FieldErrors<NewProduct>;
  getValues: UseFormGetValues<NewProduct>;
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  useEffect(() => {
    register("rating", { valueAsNumber: true });
  }, [register]);

  useEffect(() => {
    const initialRating = getValues("rating");
    if (initialRating) {
      setSelectedRating(initialRating);
    }
  }, [getValues, setValue]);
  return (
    <div className="col-span-1">
      <label className="block mb-2 font-semibold">التقييم</label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleStarClick(star)}
            data-tribute="true"
            className="text-yellow-500 text-2xl focus:outline-none">
            {selectedRating >= star ? "★" : "☆"}
          </button>
        ))}
      </div>
      <input
        type="hidden"
        value={selectedRating}
        {...register("rating", { valueAsNumber: true })}
      />
      {errors.rating && <p>{String(errors.rating.message)}</p>}
    </div>
  );
};

export default Ration;
