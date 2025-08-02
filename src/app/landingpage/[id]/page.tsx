import { getProductById } from "@/api/product";
import LandingPageId from "@/components/LandingPageID";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await getProductById(id);

  return {
    title: res.name,
    description: res.description,
    openGraph: {
      images: [
        {
          url: res.images[0] || "https://pngimg.com/d/google_PNG19644.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) return null;

  return <LandingPageId productId={id} />;
};

export default Page as React.FC;
