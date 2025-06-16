"use client";
import { useLanguage } from "@/context/languageColorContext";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import Image from "next/image";
import React, { useRef } from "react";
import LoadingComp from "../Loading";
import { useProfileContext } from "@/context/ProfileContext";

const CaverPart = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { currentColor } = useTheme();
  const { Profile, LoadingProfile } = useProfileContext();

  const { dataOflang } = useLanguage();
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (LoadingProfile) {
    return <LoadingComp />;
  }
  return (
    <div className="relative overflow-hidden">
      {Profile?.cover?.enable &&
        (Profile?.cover?.name ? (
          <Image
            priority
            className="w-full h-[40vh] object-cover"
            alt=""
            src={Profile?.cover.name}
            width={200}
            height={200}></Image>
        ) : (
          <video
            width={1920}
            height={1080}
            src={Profile?.cover?.name ? Profile?.cover?.name : `/video (2).mp4`}
            className="w-full h-screen object-cover "
            loop
            muted
            autoPlay
            playsInline
            id="cover"
          />
        ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-20 cover">
        <h1 id="Up" className="text-4xl font-bold mb-4 text-center ">
          {dataOflang?.welcome_full || "مرحبًا بكم في بيبي بلوم"}
        </h1>
        <p id="Up" className="text-xl mb-4">
          {dataOflang?.tagline || "أفضل المنتجات لطفلك"}
        </p>
        <button
          id="Up"
          onClick={scrollToProducts}
          className={`bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-white px-4 py-2 rounded-lg hover:bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-600 transition-colors duration-200`}>
          {dataOflang?.browse_products || "استعرض المنتجات"}
        </button>
      </div>
    </div>
  );
};

export default CaverPart;
