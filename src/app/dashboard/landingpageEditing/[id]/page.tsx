"use client";
import LandingpageEditing from "@/components/LandingEdit/LandingpageEditing";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);
  if (!id) return null;
  return <LandingpageEditing ProductID={id} />;
};

export default Page;
