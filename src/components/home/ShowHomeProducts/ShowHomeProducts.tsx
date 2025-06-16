"use client";
import React, { useState } from "react";
import Filtrage from "../Filtrage/Filtrage";
import MainPartShowingProducts from "../MainPartShowingProducts";
import { Product } from "@/Types/ProductPart";
import { Category } from "@/Types/Categorys";
import ShowingPassedProdductsFiltred from "../Filtrage/ShowingPassedProdductsFiltred";

const ShowHomeProducts = ({ categories }: { categories: Category[] }) => {
  const [filtredProducts, setfiltredProducts] = useState<Product[] | null>(
    null
  );
  console.log("Filtered products", filtredProducts); // ✅ Add this here

  return (
    <>
      <Filtrage setfiltredProducts={setfiltredProducts}>
        {filtredProducts ? (
          <ShowingPassedProdductsFiltred
            category={false}
            initialProducts={filtredProducts}
          />
        ) : (
          <>
            {" "}
            {categories
              .filter((cat) => cat.showing && cat.products?.length > 0)
              .map((cat) => {
                console.log("Rendering category:", cat.name, cat.products); // Add this line
                return (
                  <div key={cat._id}>
                    <MainPartShowingProducts
                      searchParams={{ name: cat.name }}
                      categoryId={cat._id}
                      category={true}
                      initialProducts={cat.products}
                    />
                  </div>
                );
              })}
          </>
        )}
      </Filtrage>
    </>
  );
};

export default ShowHomeProducts;
