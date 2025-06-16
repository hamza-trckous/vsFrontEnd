"use client";

import React from "react";
import Container from "../multualCompenents/Container";
import TitleRtl from "../multualCompenents/Title";
import FormForAddingCategory from "./FormForAddingCategory";
import TableCategory from "./TableCategory";
import { useLanguage } from "@/context/languageColorContext";

const MainForTableCategory = () => {
  const { dataOflang } = useLanguage();

  return (
    <Container>
      <TitleRtl
        title={dataOflang?.addingProduct.addCategoryPart || "إضافة الفئات"}
      />
      <FormForAddingCategory />
      <hr></hr>
      <TableCategory />
    </Container>
  );
};

export default MainForTableCategory;
