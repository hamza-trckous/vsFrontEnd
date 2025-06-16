"use client";
import CardForProduct from "@/components/cardForProduct";
import TitleRtl from "@/components/dashbord/multualCompenents/Title";
import { Productoption } from "@/Types/ProductPart";
import React from "react";

const ShowingPassedProdductsFiltred = ({
  initialProducts,
  searchParams
}: Productoption) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-wrap justify-evenly w-full md:w-11/12 mt-4 relative">
        <br />
        <TitleRtl title={searchParams?.name || "Products"} />

        {initialProducts && initialProducts.length > 0 ? (
          initialProducts.map((product, index) => (
            <CardForProduct
              key={product._id}
              id={product._id}
              forCart={false}
              index={index}
              product={{
                images: product.images,
                name: product.name,
                price: product.price,
                discountedPrice: product.discountedPrice,
                rating: product.rating,
                description: product.description,
                reviews: product.reviews,
                colors: product.colors,
                sizes: product.sizes,
                _id: product._id,
                withShipping: product.withShipping,
                category: product.category
              }}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ShowingPassedProdductsFiltred;
