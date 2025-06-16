"use client";

import { useLanguage } from "@/context/languageColorContext";
type TableLabels = {
  productImages: string;
  productName: string;
  description: string;
  price: string;
  colors: string;
  sizes: string;
  rating: string;
  reviews: string;
  includesShipping: string;
  actions: string;
};
export const TableTitles = () => {
  const { dataOflang } = useLanguage();

  const table: Partial<TableLabels> = dataOflang?.table || {};

  const tableTitles = [
    table.productImages || "صور المنتج",
    table.productName || "اسم المنتج",
    table.description || "الوصف",
    table.price || "السعر",
    table.colors || "الألوان",
    table.sizes || "الأحجام",
    table.rating || "التقييم",
    table.reviews || "المراجعات",
    table.includesShipping || "يتضمن الشحن",
    table.actions || "إجراءات"
  ];

  return tableTitles;
};

export const TableTitlesCategory = () => {
  const { dataOflang } = useLanguage();

  const tableTitles = [
    dataOflang?.addingProduct?.categoryTitle || "الفئة",
    dataOflang?.table?.description || "الوصف",
    dataOflang?.table?.photos || "الصور",
    dataOflang?.table?.actions || "إجراءات"
  ];

  return tableTitles;
};
