"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { getProductById } from "@/api/product";
import type { Product, NewProduct } from "@/Types/ProductPart";
import useTrackPageView from "@/hooks/useTrackPageView";
import trackFacebookEvent from "@/utils/trackFacebookEvent";
import { useAuth } from "@/context/AuthContext";
import { useShipping } from "@/context/ShippingContext";
import { useForm } from "react-hook-form";
import { OrderDetails } from "@/Types/OrderPart";
import FormOrder from "@/components/landingpage/FormOrder";
import { injectFacebookPixel } from "@/api/TrackConversion";

interface LandingPageIDProps {
  productId: string;
}

const LandingPageId: React.FC<LandingPageIDProps> = ({ productId }) => {
  const [product, setProduct] = useState<NewProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn, isAdmin } = useAuth();
  const { shippingPrices } = useShipping();
  const { watch } = useForm<OrderDetails>();
  const selectedWilaya = watch("wilaya");
  const [pixelId] = useState("1325739738421612");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Track Facebook "ViewContent" event
  const viewContent = useCallback(
    (product: Product) => {
      trackFacebookEvent({
        eventName: "ViewContent",
        data: {
          content_type: "product",
          content_ids: [product._id],
          content_name: product.name,
          value: product.price,
          currency: "DZD",
        },
        isAdmin,
      });
    },
    [isAdmin]
  );

  // Initialize Facebook Pixel
  useEffect(() => {
    injectFacebookPixel(pixelId);
  }, [pixelId]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        viewContent(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, viewContent]);

  // Track page view
  useTrackPageView({
    page_name: "ProductPage",
    user_role: isLoggedIn ? "logged_in" : "guest",
  });

  // Image navigation handlers
  const handleNextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="  p-1 " dir="rtl">
      <div className="bg-white shadow-md rounded-lg p-1">
        <div className="flex flex-col md:flex-row">
          {/* Product Details Section */}
          <div className="md:w-1/2 p-1">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              {product.name}
            </h2>

            {/* Price Information */}
            <div className="flex items-center justify-start mt-2 ">
              <span className="text-gray-600 line-through mr-2 text-md">
                {product.price} دينار جزائري
              </span>
              <span className="text-teal-500 font-bold text-md mr-2">
                {product.discountedPrice ?? product.price} دينار جزائري
              </span>
            </div>

            {/* Shipping Price */}
            {product.withShipping === "نعم" && (
              <div className="flex items-center justify-start mt-2">
                <span className="text-gray-600 mr-2 text-md ">سعر الشحن:</span>
                <span className="text-teal-500 font-bold text-md mr-2">
                  {selectedWilaya ? shippingPrices[selectedWilaya] || 0 : 0} دج
                </span>
              </div>
            )}

            {/* Rating Stars */}
            <div className="flex items-center justify-start mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < product.rating ? "text-yellow-500" : "text-gray-300"
                  }
                  size={16}
                />
              ))}
            </div>

            {/* Product Description */}
            <p
              className="mt-4 text-gray-700 text-sm"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              {product.description}
            </p>

            {/* Colors Section */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4 text-right">
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  الألوان:
                </h3>
                <div className="flex flex-wrap justify-start">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm ml-2 mb-2">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Section */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4 text-right">
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  الأحجام:
                </h3>
                <div className="flex content-start justify-start flex-wrap w-full">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="flex justify-end border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm ml-2 mb-2">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-4 text-right">
              <h3
                className="text-sm font-bold"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                مراجعات:
              </h3>
              <div className="flex flex-col space-y-2">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-2 bg-gray-100 text-gray-700 text-sm">
                    {review.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="md:w-1/2">
            <div className="relative">
              {product.images[currentImageIndex] && (
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={625}
                  height={240}
                  className="w-full h-96 object-fill rounded-lg"
                  loading="eager"
                />
              )}
              {product.images.length > 1 && (
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

            {/* Thumbnail Images */}
            <div className="flex space-x-2 justify-center mt-4 overflow-x-auto scrollbar-hide">
              {product.images.map(
                (image, index) =>
                  image && (
                    <Image
                      key={index}
                      src={image}
                      alt={`صورة ${index + 1}`}
                      width={64}
                      height={64}
                      className={`w-16 h-16 object-cover mt-5 rounded-lg cursor-pointer m-2 ${
                        currentImageIndex === index
                          ? "border-2 border-teal-500"
                          : ""
                      }`}
                      onClick={() => handleImageClick(index)}
                      loading="lazy"
                    />
                  )
              )}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Order Form */}
        <FormOrder product={product} />
      </div>
    </div>
  );
};

export default LandingPageId;
