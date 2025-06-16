"use client";
import Container from "@/components/dashbord/multualCompenents/Container";
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
    <Container>
      <Table products={validProducts} landingPage />
    </Container>
  );
};

export default Page;
