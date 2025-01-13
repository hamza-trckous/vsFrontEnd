"use client";
import { NewProduct } from "@/Types/ProductPart";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

const MethodAddingPhoto = ({
  setNewProduct,
  newProduct,
  setValue,
  errors,
}: {
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

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
        setValue("images", [...newProduct.images, reader.result as string]);
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
    <div className="mb-2">
      <label className="block text-right">إضافة صور:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
