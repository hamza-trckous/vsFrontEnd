"use client";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { NewProduct } from "@/Types/ProductPart";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

const MethodAddingPhoto = ({
  lang,
  dataOfLang,
  setNewProduct,
  newProduct,
  setValue,
  errors,
}: {
  dataOfLang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
  newProduct: NewProduct;
  register: UseFormRegister<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  errors: FieldErrors<NewProduct>;
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    setImagePreviews(newProduct.images);
  }, [newProduct.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newImages]);

    const updatedImages: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedImages.push(reader.result as string);
        if (updatedImages.length === files.length) {
          setNewProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...updatedImages],
          }));
          setValue("images", [...newProduct.images, ...updatedImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct((prev) => ({
      ...prev,
      images: updatedImages,
    }));
    setValue("images", updatedImages);
    setImagePreviews(updatedImages);
  };

  return (
    <div className="m-2" dir={lang === "AR" ? "rtl" : "ltr"}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {dataOfLang?.addingProduct.addingPhoto || "إضافة صور:"}
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
      />
      <div className="flex flex-wrap mt-2">
        {imagePreviews.map((src, index) => (
          <div key={index} className="relative w-16 h-16 mr-2 mb-2">
            <Image
              width={200}
              height={200}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              ×
            </button>
          </div>
        ))}
      </div>
      {errors.images && (
        <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
      )}
    </div>
  );
};

export default MethodAddingPhoto;
