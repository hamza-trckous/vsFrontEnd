"use client";
import mergeClassNames from "merge-class-names";
import { themeColors } from "@/utils/theme";
import { Category } from "@/Types/Categorys";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect } from "react";
import { useTheme } from "@/context/themeContext";
import { useRouter } from "next/navigation";

const OneCategory = ({ item }: { item: Category }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.prefetch(`/productsCategorys/${item._id}?name=${item.name}`);
    }
  }, [item._id, item.name]);
  const { currentColor } = useTheme();

  const borderHoverClass =
    themeColors[currentColor ?? "teal"]?.hover ||
    `hover:border-${themeColors[currentColor ?? "teal"]?.basics}-200`;
  return (
    <Link
      href={`/productsCategorys/${item._id}?name=${item.name}`}
      className={`flex flex-col hover:text-${
        themeColors[currentColor ?? "teal"]?.basics
      }-500 transition-all  w-[calc(16.66%-8px)] min-w-[150px] items-center p-2`}
    >
      <Image
        loading="lazy"
        width={150}
        height={150}
        src={item.image}
        alt={`category`}
        className={mergeClassNames(
          "w-20 transition-all h-20 object-cover rounded-full m-2 border-2 cursor-pointer hover:scale-[110%]",
          borderHoverClass,
        )}
      />
      <h2
        className={`text-center text-xs hover:text-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 transition-all `}
      >
        {item.name}
      </h2>
    </Link>
  );
};

export default OneCategory;
