"use client";
import React, { Suspense, useEffect, useState } from "react";
import Filtrage from "../Filtrage/Filtrage";
import MainPartShowingProducts from "../MainPartShowingProducts";
import { Product } from "@/Types/ProductPart";
import { Category } from "@/Types/Categorys";
import ShowingPassedProdductsFiltred from "../Filtrage/ShowingPassedProdductsFiltred";

const ShowHomeProducts = ({ categories }: { categories: Category[] }) => {
  const [mounted, setMounted] = useState(false);
  const [filtredProducts, setfiltredProducts] = useState<Product[] | null>(
    null
  );

  useEffect(() => {
    console.log("categories", categories);
    categories.forEach((cat) => {
      console.log(
        cat.name,
        "showing:",
        cat.showing,
        "products:",
        cat.products?.length
      );
    });
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Filtrage setfiltredProducts={setfiltredProducts}>
        <Suspense fallback={<div>Loading...</div>}>
          {filtredProducts ? (
            <ShowingPassedProdductsFiltred
              category={false}
              initialProducts={filtredProducts}
            />
          ) : (
            <>
              {categories
                .filter((cat) => cat.showing && cat.products?.length > 0)
                .map((cat) => {
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
        </Suspense>
      </Filtrage>
    </>
  );
};

export default ShowHomeProducts;
