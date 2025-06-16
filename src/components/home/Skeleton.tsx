"use client";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";

const Skeleton = dynamic(
  () => import("react-loading-skeleton").then((mod) => mod.default),
  {
    ssr: false,
  }
);
const SkeletonNav: React.FC = () => {
  return (
    <div className=" bg-white flex bg-opacity-70 backdrop-blur-lg shadow-md ">
      <div className="ml-8 flex gap-8 sticky top-0 z-50 p-4 justify-end">
        <Skeleton borderRadius={70} width={30} height={20} />
        <Skeleton borderRadius={70} width={45} height={20} />
        <Skeleton borderRadius={70} width={45} height={20} />
        <Skeleton borderRadius={70} width={45} height={20} />
      </div>
      <div className="skeleton-links flex justify-end  items-center w-full  mr-2">
        <Skeleton borderRadius={60} width={170} height={30} />
      </div>
    </div>
  );
};
export default SkeletonNav;
