"use client";
import { useLanguage } from "@/context/languageColorContext";
import { useProfileContext } from "@/context/ProfileContext";
import React from "react";

const Slogon = () => {
  const { dataOflang, lang } = useLanguage();
  const { Profile } = useProfileContext();
  if (!lang || !dataOflang) return null;

  return (
    <div
      className="text-white italic  text-xs md:text-base w-full text-center"
      style={{ fontFamily: "Cairo, sans-serif" }}>
      {Profile?.slogon?.name || "Without Slogon "}
    </div>
  );
};

export default Slogon;
