import AboutComponent from "@/components/About/AboutComponent";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About Us | Baby Bloom",
  description:
    "Learn more about Baby Bloom — our mission, story, and what makes us special in the world of baby products.",
  openGraph: {
    title: "About Us | Baby Bloom",
    description: "Discover the story and mission behind Baby Bloom.",
    url: "https://vs-ebon.vercel.app/about",
    type: "website",
    images: [
      {
        url: "https://vs-ebon.vercel.app/about.png",
        width: 1200,
        height: 630,
        alt: "About Baby Bloom"
      }
    ]
  }
};
const AboutPage = () => {
  return (
    <>
      <AboutComponent />
    </>
  );
};

export default AboutPage;
