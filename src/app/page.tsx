import { getAllProducts } from "@/api/product";
import HomePage from "@/components/home/Home";
import React from "react";
const getInitialProducts = async () => {
  const response = await getAllProducts({ page: 1, limit: 3 });
  return response.products;
};
const page = async () => {
  const initialProducts = await getInitialProducts();
  return <HomePage initialProducts={initialProducts} />;
};

export default page;
