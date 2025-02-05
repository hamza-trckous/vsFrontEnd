import React from "react";
import OneCategory from "./OneCategory";
import { useCategory } from "@/context/CategoryContext";

const CategoryBar = () => {
  const { category } = useCategory();
  return (
    <section className=" bg-gray-50 m-2 flex justify-between items-center rounded-t-lg  flex-wrap">
      {category?.map((item) => (
        <OneCategory key={item._id} item={item} />
      ))}
    </section>
  );
};

export default CategoryBar;
