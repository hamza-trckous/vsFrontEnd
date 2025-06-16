// app/page.tsx
import { getCategories } from "@/api/category";
import { getAllProducts } from "@/api/product";
import HomePage from "@/components/home/Home";

// ISR
export const revalidate = 60;

const getInitialProducts = async () => {
  const response = await getAllProducts({ page: 1, limit: 3 });
  console.log("product", response);
  return response.products;
};

export default async function Page() {
  const initialProducts = await getInitialProducts();
  const categories = await getCategories();

  return <HomePage categories={categories} initialProducts={initialProducts} />;
}
