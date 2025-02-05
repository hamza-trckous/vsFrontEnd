import { getCategoryProducts } from "@/api/category";
import CategoryPage from "@/components/Category/CategorysAll/CategoryOne/CategoryPage";
import React from "react";

// The params type should match the folder structure
interface PageProps {
  params: { Show: string }; // Note: Show should match the [Show] folder name exactly
  searchParams: { name: string };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async ({ params, searchParams }: PageProps) => {
  // No need to await params.Show as it's already a string
  const resolvedParams = await params;
  const response = await getCategoryProducts(resolvedParams.Show);
  const nameOfCategory = await searchParams;

  return (
    <CategoryPage
      searchParams={nameOfCategory}
      categoryId={resolvedParams.Show}
      initialProducts={response}
    />
  );
};

export default Page;
