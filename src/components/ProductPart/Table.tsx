import { ProductWithreviews } from "@/Types/ProductPart";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Table = ({
  products = [],
  onDelete,
}: {
  products: ProductWithreviews[];
  onDelete: (id: string) => void;
}) => {
  const router = useRouter();
  const [showMoreImages, setShowMoreImages] = useState<{
    [key: string]: boolean;
  }>({});
  const [showMoreDescription, setShowMoreDescription] = useState<{
    [key: string]: boolean;
  }>({});
  const [showMoreReviews, setShowMoreReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const handleEdit = (id: string) => {
    router.push(`/dashboard/Product/${id}`);
  };

  const toggleShowMoreImages = (id: string) => {
    setShowMoreImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShowMoreDescription = (id: string) => {
    setShowMoreDescription((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShowMoreReviews = (id: string) => {
    setShowMoreReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-sm bg-teal-50">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1 border border-gray-400 w-20">
              صور المنتج
            </th>
            <th className="px-2 py-1 border border-gray-400 w-24">
              اسم المنتج
            </th>
            <th className="px-2 py-1 border border-gray-400 w-32">الوصف</th>
            <th className="px-2 py-1 border border-gray-400 w-20">السعر</th>
            <th className="px-2 py-1 border border-gray-400 w-24">الألوان</th>
            <th className="px-2 py-1 border border-gray-400 w-24">الأحجام</th>
            <th className="px-2 py-1 border border-gray-400 w-20">التقييم</th>
            <th className="px-2 py-1 border border-gray-400 w-36">المراجعات</th>
            <th className="px-2 py-1 border border-gray-400 w-12">
              يتضمن الشحن
            </th>
            <th className="px-2 py-1 border border-gray-400 w-20">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products
            .slice()
            .reverse()
            .map((product, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 py-1 border border-gray-400 w-20 break-words">
                  <div className="flex flex-col items-center relative">
                    {product.images[0] && (
                      <Image
                        width={200}
                        height={200}
                        src={product.images[0]}
                        alt={`${product.name} 1`}
                        className="w-12 h-12 rounded mb-1"
                      />
                    )}
                    {product.images.length > 1 && (
                      <button
                        onClick={() => toggleShowMoreImages(product._id)}
                        className="absolute top-0 right-0 bg-blue-500 text-white px-1 py-0.5 rounded-full hover:bg-blue-600 transition-colors duration-200 text-xs">
                        {showMoreImages[product._id] ? "−" : "+"}
                      </button>
                    )}
                    {showMoreImages[product._id] &&
                      product.images
                        .slice(1)
                        .map(
                          (url, imgIndex) =>
                            url && (
                              <Image
                                width={200}
                                height={200}
                                key={`${product._id}-image-${imgIndex + 1}`}
                                src={url}
                                alt={`${product.name} ${imgIndex + 2}`}
                                className="w-12 h-12 rounded mt-1"
                              />
                            )
                        )}
                  </div>
                </td>
                <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
                  {product.name}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-36 text-right break-words">
                  <div
                    className={`overflow-hidden ${
                      showMoreDescription[product._id]
                        ? "max-h-full"
                        : "max-h-12"
                    }`}>
                    {product.description}
                  </div>
                  {product.description.length > 30 && (
                    <button
                      onClick={() => toggleShowMoreDescription(product._id)}
                      className="text-blue-500 text-xs mt-1">
                      {showMoreDescription[product._id]
                        ? "عرض أقل"
                        : "عرض المزيد"}
                    </button>
                  )}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
                  دينار جزائري <br /> {product.price} دج
                  <br />{" "}
                  {product.discountedPrice && product.discountedPrice > 0 && (
                    <div className="text-green-600">
                      بعد التخفيض: {product.discountedPrice} دج
                    </div>
                  )}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
                  {product.colors.join(", ")}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-24 text-right break-words">
                  {product.sizes.join(", ")}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
                  {"★".repeat(product.rating) + "☆".repeat(5 - product.rating)}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-36 text-right break-words">
                  <div
                    className={`overflow-hidden ${
                      showMoreReviews[product._id] ? "max-h-full" : "max-h-12"
                    }`}>
                    {product.reviews.map((review, index) => (
                      <div
                        key={`${product._id}-review-${index}`}
                        className="mb-2">
                        <p>{review.text}</p>
                        <div className="flex flex-col space-x-2">
                          {review.images &&
                            review.images.map(
                              (url, imgIndex) =>
                                url && (
                                  <Image
                                    width={200}
                                    height={200}
                                    key={`${product._id}-review-${index}-image-${imgIndex}`}
                                    src={url}
                                    alt={`Review ${index + 1} Image ${
                                      imgIndex + 1
                                    }`}
                                    className="w-12 h-12 rounded"
                                  />
                                )
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {product.reviews.length > 1 && (
                    <button
                      onClick={() => toggleShowMoreReviews(product._id)}
                      className="text-blue-500 text-xs mt-1">
                      {showMoreReviews[product._id] ? "عرض أقل" : "عرض المزيد"}
                    </button>
                  )}
                </td>
                <td className="px-2 py-1 border border-gray-400  text-right break-words">
                  {product.withShipping}
                </td>
                <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-blue-500 mb-1 w-16 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs">
                    تعديل
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500  w-16 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs ml-2">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-8 flex items-center justify-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default Table;
