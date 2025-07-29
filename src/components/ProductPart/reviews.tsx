import { LanguageConfig } from "@/Types/LanguageConfig";
import { NewProduct, Review } from "@/Types/ProductPart";
import Image from "next/image";
import React, { useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister
} from "react-hook-form";
import ButtonSecondary from "./ButtonSecondary";

const Reviews = ({
  dataOflang,
  lang,
  register,
  errors,
  setValue,
  unregister,
  initialReviews = [] // Ensure initialReviews is always an array
}: {
  dataOflang: LanguageConfig | undefined;
  lang: "AR" | "EN" | undefined;
  register: UseFormRegister<NewProduct>;
  errors: FieldErrors<NewProduct>;
  setValue: UseFormSetValue<NewProduct>;
  unregister: UseFormUnregister<NewProduct>;
  initialReviews: Review[];
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = () => {
    const newReview = { text: "", images: [] };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setValue("reviews", updatedReviews);
  };

  const removeReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    unregister(`reviews.${index}`);
    setValue("reviews", updatedReviews);
  };

  const handleReviewTextChange = (index: number, text: string) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].text = text;
    setReviews(updatedReviews);
    setValue(`reviews.${index}.text`, text);
  };
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  const handleReviewImageUpload = async (
    index: number,
    files: FileList | null
  ) => {
    if (files) {
      const base64Images = await Promise.all(Array.from(files).map(toBase64));

      const updatedReviews = [...reviews];
      if (!updatedReviews[index].images) {
        updatedReviews[index].images = [];
      }
      updatedReviews[index].images.push(...base64Images);

      setReviews(updatedReviews);
      setValue(`reviews.${index}.images`, updatedReviews[index].images);
    }
  };

  return (
    <div dir={lang === "AR" ? "rtl" : "ltr"} className="col-span-2">
      <label className="block mb-1 font-semibold">
        {dataOflang?.addingProduct.reviews || "المراجعات"}
      </label>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4 border p-2 rounded">
          <textarea
            placeholder={
              dataOflang?.addingProduct.ScriptOfreviews || "نص المراجعة"
            }
            value={review.text}
            data-tribute="true"
            className="p-2 border border-gray-300 rounded w-full text-right"
            {...register(`reviews.${index}.text`, {
              onChange: (e) => handleReviewTextChange(index, e.target.value)
            })}></textarea>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleReviewImageUpload(index, e.target.files)}
            data-tribute="true"
            className="mt-2 p-2 border border-gray-300 rounded text-right"
          />
          {/* Preview Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {review.images.map((url, imgIndex) => (
                <div key={imgIndex} className="w-16 h-16 m-1 border rounded">
                  <Image
                    width={200}
                    height={200}
                    src={url}
                    alt={`Review ${index + 1} Image ${imgIndex + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => removeReview(index)}
            className="m-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">
            {dataOflang?.addingProduct.deletereviews || "إزالة المراجعة"}
          </button>
        </div>
      ))}
      <ButtonSecondary
        lang={lang}
        TitleOfButton={`${
          dataOflang?.addingProduct.addingReviews || " إضافة مراجعة"
        }`}
        handleAddSize={addReview}
      />
      {errors.reviews && <p>{String(errors.reviews.message)}</p>}
    </div>
  );
};

export default Reviews;
