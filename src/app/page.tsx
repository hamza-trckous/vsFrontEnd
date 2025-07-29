// app/page.tsx
import { getCategories } from "@/api/category";
import HomePage from "@/components/home/Home";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://vs-ebon.vercel.app/"),
  title: "Home | MyStore",
  description:
    "Welcome to MyStore – explore fresh daily menus, trending products, and a seamless shopping experience tailored to your needs",
  openGraph: {
    title: "Home | MyStore",
    description:
      "hop daily fresh menus and trending products tailored to your taste. Enjoy a seamless and modern shopping experience at MyStore.",
    type: "website",
    url: "/",
    siteName: "MyStore",
    images: [
      {
        url: "https://vs-ebon.vercel.app/OpenGraph/home.png",
        width: 1200,
        height: 630,
        alt: "MyStore Cover Image"
      }
    ]
  }
};

// ISR
export const revalidate = 60;

export default async function Page() {
  const categories = await getCategories();

  return <HomePage categories={categories} />;
}
