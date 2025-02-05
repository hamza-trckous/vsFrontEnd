"use client";
import Image from "next/image";
import React, { useState } from "react";
interface itemsforproduct {
  images: string[];
  name: string;
  _id: string;
}

interface itemsforcategory {
  image: string;
  name: string;
  _id: string;
}

interface forproduct {
  forproduct: true;
  items: itemsforproduct;
}
interface forcategory {
  forproduct: false;

  items: itemsforcategory;
}
type Props = forproduct | forcategory;

const ImagesProductTable = ({ items, forproduct }: Props) => {
  const [showMoreImages, setShowMoreImages] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleShowMoreImages = (id: string) => {
    setShowMoreImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <td className="px-2 py-1 border border-gray-400 w-20 break-words">
      <div className="flex flex-col items-center relative">
        {forproduct
          ? items.images[0] && (
              <Image
                width={200}
                height={200}
                src={items.images[0]}
                alt={`${items.name} 1`}
                className="w-12 h-12 rounded mb-1"
              />
            )
          : items.image && (
              <Image
                width={200}
                height={200}
                src={items.image}
                alt={`${items.name} 1`}
                className="w-12 h-12 rounded mb-1"
              />
            )}
        {forproduct && items.images.length > 1 && (
          <button
            onClick={() => toggleShowMoreImages(items._id)}
            className="absolute top-0 right-0 bg-blue-500 text-white px-1 py-0.5 rounded-full hover:bg-blue-600 transition-colors duration-200 text-xs">
            {showMoreImages[items._id] ? "−" : "+"}
          </button>
        )}
        {forproduct &&
          showMoreImages[items._id] &&
          items.images
            .slice(1)
            .map(
              (url: string, imgIndex: number) =>
                url && (
                  <Image
                    width={200}
                    height={200}
                    key={`${items._id}-image-${imgIndex + 1}`}
                    src={url}
                    alt={`${items.name} ${imgIndex + 2}`}
                    className="w-12 h-12 rounded mt-1"
                  />
                )
            )}
      </div>
    </td>
  );
};

export default ImagesProductTable;
