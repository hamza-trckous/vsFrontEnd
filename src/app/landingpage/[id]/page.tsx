"use client";
import LandingPageId from "@/components/LandingPageID";
import React from "react";
import { useParams } from "next/navigation";
const Page = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  if (!id) return null;
  return <LandingPageId productId={id} />;
};

export default Page;
