import React from "react";
import CoverPart from "@/components/home/CaverPart";
import CategoryBar from "@/components/home/Category/CategoryBar";
import PageTracker from "../Trackers/TrackersForHome/TrackerHome";
import Footer from "@/components/home/Footer";
import { Category } from "@/Types/Categorys";
import ShowHomeProducts from "./ShowHomeProducts/ShowHomeProducts";

const HomePage = ({ categories }: { categories: Category[] }) => {
  return (
    <div>
      <PageTracker />
      <CategoryBar Category={categories} />
      <CoverPart />
      <ShowHomeProducts categories={categories} />

      <Footer />
    </div>
  );
};

export default HomePage;
