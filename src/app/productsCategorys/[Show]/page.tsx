// src/app/productsCategorys/[Show]/page.tsx
import { getCategoryProducts } from "@/api/category";
import CategoryPage from "@/components/Category/CategorysAll/CategoryOne/CategoryPage";

// Use the correct type definition for Next.js pages
type Props = {
  params: Promise<{ Show: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async ({ params, searchParams }: Props) => {
  // Await the promises
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const products = await getCategoryProducts(resolvedParams.Show);

  return (
    <CategoryPage
      searchParams={{ name: resolvedSearchParams.name as string }}
      categoryId={resolvedParams.Show}
      initialProducts={products}
    />
  );
};

export default Page;
