/* eslint-disable */

import { getCategoryById, getCategoryProducts } from "@/api/category";
import CategoryPage from "@/components/Category/CategorysAll/CategoryOne/CategoryPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const name =
    typeof resolvedSearchParams.name === "string"
      ? resolvedSearchParams.name
      : "Category";

  const slug = resolvedParams.Show;
  const category = await getCategoryById(resolvedParams.Show);

  return {
    title: `${name} | MyStore`,
    description: `Browse products in the ${name} category from MyStore.`,
    metadataBase: new URL("https://vs-ebon.vercel.app"),
    alternates: {
      canonical: `https://vs-ebon.vercel.app/productsCategorys/${slug}`
    },
    openGraph: {
      title: `${name} | MyStore`,
      description: `Discover trending products in ${name}. Only on MyStore.`,
      type: "website",
      url: `https://vs-ebon.vercel.app/productsCategorys/${slug}`,
      siteName: "MyStore",
      images: [
        {
          url: category?.image || "/OpenGraph/default-category.png",
          width: 1200,
          height: 630,
          alt: `${name} preview image`
        }
      ]
    }
  };
}
// Use the correct type definition for Next.js pages
type Props = {
  params: Promise<{ Show: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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
