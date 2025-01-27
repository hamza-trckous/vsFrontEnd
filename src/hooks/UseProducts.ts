"use client";

import { getAllProductsNormal } from "@/api/product";
import { NewProduct, ProductWithreviews } from "@/Types/ProductPart";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<NewProduct[] | ProductWithreviews[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsNormal();
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts };
};
