import MainPartShowingProducts from "@/components/home/MainPartShowingProducts";
import { Product } from "@/Types/ProductPart";
import React from "react";

const CategoryPage = ({
  searchParams,
  initialProducts,
  productsRef,
  categoryId,
}: {
  searchParams: { name: string };
  initialProducts: Product[];
  productsRef?: React.RefObject<HTMLDivElement>;
  categoryId: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <MainPartShowingProducts
        searchParams={searchParams}
        category={true}
        categoryId={categoryId}
        initialProducts={initialProducts}
        productsRef={productsRef}
      />
    </div>
  );
};

export default CategoryPage;
