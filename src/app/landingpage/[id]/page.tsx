"use client";
import LandingPageId from "@/components/LandingPageID";
import React from "react";
import { useParams } from "next/navigation";
const Page = () => {
  const { id } = useParams<{ id: string }>();
  return <LandingPageId productId={id} />;
};

export default Page;
