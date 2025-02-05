"use client";
import Table from "@/components/ProductPart/Table";
import { useProducts } from "@/hooks/UseProducts";
import { ProductWithreviews } from "@/Types/ProductPart";
import React from "react";

const Page = () => {
  const { products } = useProducts();
  const validProducts = products.filter(
    (product): product is ProductWithreviews => product._id !== undefined
  ) as ProductWithreviews[];
  return (
    <div className="card-container bg-white shadow-md rounded-lg p-4 w-full md:w-11/12 flex">
      <Table products={validProducts} landingPage />
    </div>
  );
};

export default Page;
