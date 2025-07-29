import ContentOfPolicies from "@/components/Policies/ContentOfPolicies";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Store Policies",
  description:
    "Read our policies including shipping, returns, privacy, and more to ensure a secure and smooth shopping experience.",
  openGraph: {
    title: "Store Policies",
    description:
      "Our shipping, return, and privacy policies to help you shop with confidence.",
    url: "https://vs-ebon.vercel.app/policies",
    type: "website",
    images: [
      {
        url: "https://vs-ebon.vercel.app/OpenGraph/Policies.png",
        width: 1200,
        height: 630,
        alt: "MyStore Policies"
      }
    ]
  }
};
const Page = () => {
  return (
    <div className=" flex text-right flex-col m-5">
      <h1>السياسات</h1>
      <ContentOfPolicies />
    </div>
  );
};

export default Page;
