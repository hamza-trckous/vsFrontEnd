"use client";
import ActionsForTable from "@/components/Table/ActionsForTable";
import DescriptionProductTable from "@/components/Table/DescriptionProductTable";
import ImagesProductTable from "@/components/Table/ImagesProductTable";
import NAmeProductsTable from "@/components/Table/NAmeProductsTable";
import { useCategory } from "@/context/CategoryContext";
import { useLanguage } from "@/context/languageColorContext";
import React from "react";

const BodyOFTableCategory = () => {
  const { category, deleateCategory } = useCategory();
  const handleEdit = () => {};
  const onDelete = (id: string) => {
    deleateCategory(id);
  };
  const ShowItem = () => {};
  const { dataOflang } = useLanguage();
  return (
    <tbody>
      {category &&
        category.map((item) => (
          <tr key={item._id} className="border-t">
            <NAmeProductsTable items={item} />
            <DescriptionProductTable item={item} />
            <ImagesProductTable forproduct={false} items={item} />
            <ActionsForTable
              itemNAme={dataOflang?.addingProduct.categoryTitle || " الفئة"}
              item={item}
              ShowItem={() => ShowItem()}
              handleEdit={handleEdit}
              onDelete={onDelete}
            />
          </tr>
        ))}
    </tbody>
  );
};

export default BodyOFTableCategory;
