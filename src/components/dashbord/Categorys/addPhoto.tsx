"use client";
import { useLanguage } from "@/context/languageColorContext";
import { Category } from "@/Types/Categorys";
import Image from "next/image";
import React from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

const AddPhoto = ({
  setError,
  setValue,
  errors,
  clearErrors,
  imagePreviews,
  setImagePreviews,
}: {
  imagePreviews: string;
  clearErrors: UseFormClearErrors<Category>;
  setError: UseFormSetError<Category>;
  setValue: UseFormSetValue<Category>;
  register: UseFormRegister<Category>;
  setImagePreviews: React.Dispatch<React.SetStateAction<string>>;

  errors: FieldErrors<Category>;
}) => {
  const { dataOflang } = useLanguage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("image", {
        type: "required",
        message: "الصورة مطلوبة",
      });
      setValue("image", "");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newImage = reader.result as string;
      setImagePreviews(newImage);

      clearErrors("image");
      setValue("image", newImage, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };
  const handleDeleteImage = () => {
    setImagePreviews("");
    setValue("image", "", { shouldValidate: true });
  };

  return (
    <div className="mb-2">
      <label className="block text-right">
        {dataOflang?.addingProduct.addingPhoto || "إضافة صور"}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <div className="flex flex-wrap mt-2">
        {imagePreviews && (
          <div className="relative w-16 h-16 mr-2 mb-2">
            <Image
              width={200}
              height={200}
              src={imagePreviews}
              alt={`Preview ${+1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage()}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        )}
      </div>
      {errors.image && (
        <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
      )}
    </div>
  );
};

export default AddPhoto;
