"use client";

import { filterProducts } from "@/api/product";
import { Product } from "@/Types/ProductPart";
import { useEffect, useState } from "react";

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await filterProducts({});
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts };
};
