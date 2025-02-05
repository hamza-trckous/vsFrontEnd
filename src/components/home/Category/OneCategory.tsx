import { Category } from "@/Types/Categorys";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const OneCategory = ({ item }: { item: Category }) => {
  return (
    <Link
      prefetch={true}
      href={`/productsCategorys/${item._id}?name=${item.name}`}
      className="flex flex-col w-[calc(16.66%-8px)] min-w-[150px] items-center p-2">
      <Image
        width={150}
        height={150}
        src={item.image}
        alt="category"
        className="w-32 transition-all h-32 object-cover rounded-full m-2 hover:border-teal-200  border-4 cursor-pointer hover:scale-[110%] "
      />
      <h1>{item.name}</h1>
    </Link>
  );
};

export default OneCategory;
