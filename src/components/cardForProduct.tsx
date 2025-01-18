"use client";
import React, { useState, memo, startTransition, useEffect } from "react";
import { FaStar, FaEye } from "react-icons/fa";
import PreviewProduct from "./PreviewProduct";
import type { ProductWithreviews, Review } from "@/Types/ProductPart";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { addToCart } from "@/api/cart"; // Import the addToCart function
import AlertModal from "./AlertModal"; // Import the AlertModal component
import trackFacebookEvent from "@/utils/trackFacebookEvent"; // Import the trackFacebookEvent function
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/useAlert";

interface CardForProductProps {
  product?: ProductWithreviews;
  index: number; // Add index prop
  id: string; // Add id prop
}

const CardForProduct: React.FC<CardForProductProps> = ({ product, id }) => {
  const [showPreview, setShowPreview] = useState(false);
  const { alertMessage, setAlertMessage, setAlertType, alertType } = useAlert();
  const { setLoading } = useAuth(); // Use the useTransition hook
  const router = useRouter();
  const defaultProduct: ProductWithreviews = {
    _id: "default-id", // Add a default ID
    images: ["https://via.placeholder.com/150"],
    name: "منتج عشوائي",
    price: 100,
    discountedPrice: 75,
    rating: 4,
    description: "هذا وصف تجريبي للمنتج. إنه منتج رائع ومفيد للغاية.",
    reviews: [] as Review[],
    colors: ["أحمر", "أزرق", "أخضر"],
    sizes: ["S", "M", "L"],
    withShipping: "نعم",
  };

  const currentProduct = product || defaultProduct;

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.stopPropagation();

    startTransition(() => {
      router.push(`/landingpage/${currentProduct._id}`);
      setLoading(false);
    });
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const { addToCart } = await import("@/api/cart"); // استيراد ديناميكي للوحدة addToCart
      if (product) {
        await addToCart(product._id, 1);
      } else {
        throw new Error("Product is undefined");
      }
      setAlertMessage("تمت الإضافة إلى السلة!");
      setAlertType("success");

      trackFacebookEvent({
        eventName: "AddToCart",
        data: {
          content_ids: product._id,
          content_name: product.name,
          content_type: "product",
          value: product.price,
          currency: "DZD",
          contents: JSON.stringify([
            {
              id: product._id,
              quantity: 1,
            },
          ]),
        },
        isAdmin: false, // or true, depending on your logic
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage(
        "حدث خطأ أثناء الإضافة إلى السلة أو يرجي التسجيل للاضافة للسلة."
      );
      setAlertType("error");
    }
  };
  const [changeImage, setChangeImage] = useState(false);
  useEffect(() => {
    const productcard = document.getElementById(id);
    if (!productcard) return;
    const handleMouseEnter = () => {
      setChangeImage(true);
    };
    const handleMouseLeave = () => {
      setChangeImage(false);
    };
    productcard.addEventListener("mouseenter", handleMouseEnter);
    productcard.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      productcard.removeEventListener("mouseenter", handleMouseEnter);
      productcard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [id]);
  return (
    <>
      <div
        id={id}
        className="flex h-[480px] flex-wrap justify-center items-center border rounded-lg shadow-md p-4 bg-white lg:w-[240px] w-full md:w-1/4 m-1 relative cursor-pointer transform transition-transform hover:scale-[102%] hover:border-teal-200 up "
        onClick={() => setShowPreview(true)}>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-teal-500"
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(true);
          }}>
          <FaEye size={20} />
        </button>

        {currentProduct.images && currentProduct.images.length > 0 ? (
          <div className="relative w-full h-60 object-cover rounded-t-lg transition-all duration-300 ">
            <Image
              src={currentProduct.images[0]}
              alt={currentProduct.name}
              width={625}
              height={240}
              className={`relative w-full h-60 object-cover rounded-t-lg transition-all duration-300 `}
              loading="lazy"
            />
            {changeImage && currentProduct.images.length > 1 && (
              <Image
                src={currentProduct.images[1]}
                alt={currentProduct.name}
                width={625}
                height={240}
                className={`relative bottom-[100%]  w-full h-64 object-cover rounded-t-lg transition-all duration-300 preview  `}
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <Image
            src={defaultProduct.images[0]}
            alt={currentProduct.name}
            width={625}
            height={240}
            className="w-full h-60 object-cover rounded-t-lg"
            unoptimized
            loading="lazy"
          />
        )}
        <div
          id="ImageCard"
          className="md:text-right sm:text-right p-2 text-center ">
          <h2
            className="text-sm font-bold break-words mr-3"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            {currentProduct.name}
          </h2>
          <div className="flex items-center justify-end mt-2 flex-wrap ">
            <span className="text-teal-500 font-bold text-sm break-words w-20">
              {currentProduct.discountedPrice} دج
            </span>
            {currentProduct.price !== 0 && (
              <span className="text-red-400 line-through mr-2 text-sm break-words w-20 ">
                {currentProduct.price} دج
              </span>
            )}
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
          <div className="flex justify-between   mt-2">
            <button
              className="bg-teal-500 m-1 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-[10px]"
              onClick={handleOrderClick}>
              طلب المنتج
            </button>
            <button
              className="bg-blue-500  m-1 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-[10px]"
              onClick={handleAddToCart}>
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-max ">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2 relative overflow-y-auto max-h-full scrollbar-hide">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-teal-500"
              onClick={() => setShowPreview(false)}>
              &times;
            </button>
            <PreviewProduct
              product={currentProduct}
              onClose={() => setShowPreview(false)}
            />
          </div>
        </div>
      )}

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};

export default memo(CardForProduct);
