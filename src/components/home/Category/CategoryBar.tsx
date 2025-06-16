"use client";
import React from "react";
import OneCategory from "./OneCategory";
import { screenSizes } from "@/utils/categoryBar/helper";
import { Category } from "@/Types/Categorys";
import { useProfileContext } from "@/context/ProfileContext";

const CategoryBar = ({ Category }: { Category: Category[] }) => {
  const { Profile } = useProfileContext();
  return (
    <>
      {Profile?.category?.enable && (
        <section className=" bg-gray-50 m-1 flex  rounded-t-lg  flex-wrap w-full justify-around">
          {screenSizes.map((a) => (
            <div key={a.name} className={a.classes}>
              {Category?.filter((e) => e.name !== "Principal Category")
                .slice(0, a.number)
                .map((item) => (
                  <OneCategory key={item._id} item={item} />
                ))}
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default CategoryBar;
