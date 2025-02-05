import React from "react";

const CaverPart = ({
  productsRef,
}: {
  productsRef: React.RefObject<HTMLDivElement>;
}) => {
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="relative overflow-hidden">
      <video
        width={1920}
        height={1080}
        src="/video (2).mp4"
        className="w-full h-screen object-cover "
        loop
        muted
        autoPlay
        playsInline
        id="cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-20 cover">
        <h1 id="Up" className="text-4xl font-bold mb-4 text-center ">
          مرحبًا بكم في بيبي بلوم
        </h1>
        <p id="Up" className="text-xl mb-4">
          أفضل المنتجات لطفلك
        </p>
        <button
          id="Up"
          onClick={scrollToProducts}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
          استعرض المنتجات
        </button>
      </div>
    </div>
  );
};

export default CaverPart;
