// components/cart/ShowingItems.tsx
"use client";

import { Product } from "@/Types/ProductPart";
import CardForProduct from "../cardForProduct";

export const ShowingItems = ({ cartItems }: { cartItems: Product[] }) => {
  // Filter out null values and check length
  const validCartItems = cartItems.filter((item: Product) => item !== null);

  if (!validCartItems || validCartItems.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p>لا يوجد منتجات في السلة</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-evenly w-full md:w-11/12">
      {validCartItems.map((item, index) => (
        <CardForProduct
          forCart={true}
          key={item._id}
          product={item}
          id={item._id}
          index={index}
        />
      ))}
    </div>
  );
};
