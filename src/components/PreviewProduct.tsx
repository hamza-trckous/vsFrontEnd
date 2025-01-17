"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { defaultProduct } from "../utils/preview";
import type { ProductWithreviews } from "../Types/ProductPart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "@/api/cart";
import AlertModal from "./AlertModal";
import trackFacebookEvent from "@/utils/trackFacebookEvent";
import FormOrder from "./landingpage/FormOrder";
interface PreviewProductProps {
  product?: ProductWithreviews;
  onClose: () => void;
}

const PreviewProduct: React.FC<PreviewProductProps> = ({
  product,
  onClose,
}) => {
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const router = useRouter();

  const currentProduct: ProductWithreviews = {
    ...defaultProduct,
    ...product,
    _id: product?._id || defaultProduct._id || "",
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentProduct.images.length - 1 : prevIndex - 1
    );
  };
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/landingpage/${currentProduct._id}`);
  };
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await addToCart(currentProduct._id, 1);
      setAlertMessage("تمت الإضافة إلى السلة!");
      setAlertType("success");
      trackFacebookEvent({
        eventName: "AddToCart",
        data: {
          content_ids: currentProduct._id,
          content_name: currentProduct.name,
          content_type: "product",
          value: currentProduct.price,
          currency: "DZD",
          contents: JSON.stringify([
            {
              id: currentProduct._id,
              quantity: 1,
            },
          ]),
        },
        isAdmin: false, // or true, depending on your logic
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage("حدث خطأ أثناء الإضافة إلى السلة.");
      setAlertType("error");
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50   "
      onClick={handleClickOutside}>
      <div className="p-4 rounded-lg shadow-lg w-11/12 md:w-3/5 relative overflow-y-auto max-h-full bg-teal-50">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-teal-500"
          onClick={onClose}>
          &times;
        </button>
        <div className="border rounded-lg shadow-md p-1 bg-white w-full m-1 overflow-y-auto max-h-screen scrollbar-hide">
          <div className="relative">
            {currentProduct.images.length > 0 && (
              <Image
                src={currentProduct.images[currentImageIndex]}
                alt={currentProduct.name}
                className="w-full h-48 md:h-60 object-contain rounded-t-lg"
                layout="responsive"
                width={500}
                height={300}
                style={{ maxHeight: "calc(100vh - 200px)" }}
              />
            )}
            {currentProduct.images.length > 0 && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-1"
                  onClick={handlePrevImage}>
                  &lt;
                </button>
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-1"
                  onClick={handleNextImage}>
                  &gt;
                </button>
              </>
            )}
          </div>
          <div className="flex space-x-2 justify-center mt-4 overflow-x-auto scrollbar-hide">
            {currentProduct.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`صورة ${index + 1}`}
                className={`w-12 h-12 md:w-16 md:h-16 object-cover mt-5 rounded-lg cursor-pointer ${
                  currentImageIndex === index ? "border-2 border-teal-500" : ""
                }`}
                onClick={() => handleImageClick(index)}
                width={64}
                height={64}
              />
            ))}
          </div>
          <div className="text-right p-2">
            <h2
              className="text-md font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              {currentProduct.name}
            </h2>
            <div className="flex items-center justify-end mt-2">
              <span className="text-gray-600 line-through mr-2 text-md">
                {currentProduct.price} دج
              </span>
              <span className="text-teal-500 font-bold text-md">
                {currentProduct.price} دج
              </span>
            </div>
            <div className="flex items-center justify-end mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < currentProduct.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                  size={14} // Smaller size for the rating stars
                />
              ))}
            </div>
            <p
              className="mt-4 text-gray-700 text-lg"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              {currentProduct.description}
            </p>
            {currentProduct.colors && currentProduct.colors.length > 0 && (
              <div className="mt-4 text-right">
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  الألوان:
                </h3>
                <div className="flex flex-wrap justify-end">
                  {currentProduct.colors.map((color, index) => (
                    <span
                      key={index}
                      className="border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm mr-2 mb-2">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {currentProduct.sizes && currentProduct.sizes.length > 0 && (
              <div className="mt-4 text-right">
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  الأحجام:
                </h3>
                <div className="flex flex-wrap justify-end">
                  {currentProduct.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm mr-2 mb-2">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 text-right">
              <h3
                className="text-sm font-bold"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                مراجعات:
              </h3>
              <div className="flex flex-col space-y-2">
                {currentProduct.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-2 bg-gray-100 text-gray-700 text-sm">
                    {typeof review === "string"
                      ? review
                      : JSON.stringify(review.text).slice(1, -1)}
                  </div>
                ))}
              </div>
            </div>
            <FormOrder product={currentProduct} />

            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm"
                onClick={handleOrderClick}>
                طلب المنتج
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
                onClick={handleAddToCart}>
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default PreviewProduct;
