// src/app/productsCategorys/[Show]/page.tsx
import { getCategoryProducts } from "@/api/category";
import CategoryPage from "@/components/Category/CategorysAll/CategoryOne/CategoryPage";

type PageProps = {
  params: { Show: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async ({ params, searchParams }: PageProps) => {
  const products = await getCategoryProducts(params.Show);

  return (
    <CategoryPage
      searchParams={{ name: searchParams.name as string }}
      categoryId={params.Show}
      initialProducts={products}
    />
  );
};

export default Page;
