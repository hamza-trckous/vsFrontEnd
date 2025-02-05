import { ProductWithreviews } from "@/Types/ProductPart";
import Image from "next/image";
import React, { useState } from "react";

const ReviewsProductTable = ({ product }: { product: ProductWithreviews }) => {
  const toggleShowMoreReviews = (id: string) => {
    setShowMoreReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [showMoreReviews, setShowMoreReviews] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <td className="px-2 py-1 border border-gray-400 w-36 text-right break-words">
      <div
        className={`overflow-hidden ${
          showMoreReviews[product._id] ? "max-h-full" : "max-h-12"
        }`}>
        {product.reviews.map((review, index) => (
          <div key={`${product._id}-review-${index}`} className="mb-2">
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
                        alt={`Review ${index + 1} Image ${imgIndex + 1}`}
                        className="w-12 h-12 rounded"
                      />
                    )
                )}
            </div>
          </div>
        ))}
      </div>
      {product.reviews.length > 0 && (
        <button
          onClick={() => toggleShowMoreReviews(product._id)}
          className="text-blue-500 text-xs mt-1">
          {showMoreReviews[product._id] ? "عرض أقل" : "عرض المزيد"}
        </button>
      )}
    </td>
  );
};

export default ReviewsProductTable;
