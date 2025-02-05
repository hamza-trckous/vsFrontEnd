import type { NewProduct } from "../Types/ProductPart";
export const defaultProduct: NewProduct = {
  images: ["https://via.placeholder.com/300"],
  name: "منتج تجريبي",
  price: 150,
  discountedPrice: 100,
  rating: 4,
  description: "هذا وصف تجريبي للمنتج. إنه منتج رائع ومفيد للغاية.",
  reviews: [
    { text: "مراجعة 1: منتج ممتاز!", images: [] },
    { text: "مراجعة 2: جودة رائعة وسعر مناسب.", images: [] },
    { text: "مراجعة 3: أنصح بشرائه.", images: [] },
  ],

  colors: ["أحمر", "أزرق", "أخضر"],
  sizes: ["S", "M", "L"],
  withShipping: "true",
  category: "default-category",
};
