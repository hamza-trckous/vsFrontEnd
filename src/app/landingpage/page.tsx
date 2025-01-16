"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { NewProduct } from "@/Types/ProductPart";
import FormOrder from "@/components/landingpage/FormOrder";
import { injectFacebookPixel } from "@/api/TrackConversion";
import Image from "next/image"; // Import next/image
import { useRouter } from "next/router"; // Import useRouter

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the router query

  const [pixelId] = useState("1325739738421612"); // Use your Facebook Pixel ID here
  const [product, setProduct] = useState<NewProduct | null>(null);

  useEffect(() => {
    injectFacebookPixel(pixelId);
  }, [pixelId]);

  useEffect(() => {
    // Fetch product data based on id
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>المنتج غير موجود</p>;
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="bg-white shadow-md rounded-lg p-4">
        <ShowProduct product={product} />

        <hr className="my-4" />

        <FormOrder product={product} />
      </div>
    </div>
  );
};

export default LandingPage;

const ShowProduct = ({ product }: { product: NewProduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <h2
          className="text-lg font-bold"
          style={{ fontFamily: "Cairo, sans-serif" }}>
          {product.name}
        </h2>
        <div className="flex items-center justify-start mt-2">
          <span className="text-gray-600 line-through mr-2 text-md">
            {product.price} $
          </span>
          <span className="text-teal-500 font-bold text-md">
            {product.discountedPrice ?? product.price} ${" "}
            {/* Display discountedPrice or price */}
          </span>
        </div>

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
        <p
          className="mt-4 text-gray-700 text-sm"
          style={{ fontFamily: "Cairo, sans-serif" }}>
          {product.description}
        </p>
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
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-4 text-right">
            <h3
              className="text-sm font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              الأحجام:
            </h3>
            <div className="flex content-start justify-start flex-wrap  w-full">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="flex  justify-end border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm ml-2 mb-2 ">
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
      <div className="md:w-1/2">
        <div className="relative">
          {product.images[currentImageIndex] && (
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              width={625}
              height={240}
              className="w-full h-96 object-fill rounded-lg"
              loading="eager" // Preload the largest image
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
  );
};
