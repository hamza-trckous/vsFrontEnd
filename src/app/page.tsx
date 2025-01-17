"use client";
import React, { useEffect, useState, useMemo, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head"; // Import Head for inlining CSS

const CardForProduct = dynamic(() => import("@/components/cardForProduct"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

import { getAllProducts } from "@/api/product";
import { Product } from "@/Types/ProductPart";
import useTrackPageView from "@/hooks/useTrackPageView";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  const [showSideBar, setShowSideBar] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useMemo(
    () => async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
        if (fetchedProducts.length > 0) {
          setTimeout(() => {
            setShowSideBar(true);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useTrackPageView({
    page_name: "AllProductsPage",
    user_role: isLoggedIn ? "logged_in" : "guest",
  });

  const memoizedProducts = useMemo(
    () =>
      products
        .slice()
        .reverse()
        .map((product, index) => (
          <CardForProduct
            key={product._id}
            id={product._id}
            product={{
              images: product.images,
              name: product.name,
              price: product.price,
              discountedPrice: product.discountedPrice, // Adjust if you have a discount logic
              rating: product.rating,
              description: product.description,
              reviews: product.reviews, // Assuming product.reviews is already of type Review[]
              colors: product.colors,
              sizes: product.sizes,
              _id: product._id,
              withShipping: product.withShipping,
            }}
            index={index} // Pass index to CardForProduct
          />
        )),
    [products]
  );

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Head>
        <style>{`
          /* Inline critical CSS */
          body {
            font-family: 'Cairo, sans-serif';
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }
          .flex {
            display: flex;
          }
          .justify-evenly {
            justify-content: space-evenly;
          }
          .w-full {
            width: 100%;
          }
          .md\\:w-11\\/12 {
            width: 91.666667%;
          }
          .md\\:w-1\\/4 {
            width: 25%;
          }
          .bg-white {
            background-color: #ffffff;
          }
          .shadow-md {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .p-4 {
            padding: 1rem;
          }
          .m-2 {
            margin: 0.5rem;
          }
          .relative {
            position: relative;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .transition-transform {
            transition: transform 0.2s;
          }
          .hover\\:scale-\\[102\\%\\] {
            transform: scale(1.02);
          }
          .hover\\:border-teal-200:hover {
            border-color: #81e6d9;
          }
          .absolute {
            position: absolute;
          }
          .top-2 {
            top: 0.5rem;
          }
          .right-2 {
            right: 0.5rem;
          }
          .text-gray-600 {
            color: #718096;
          }
          .hover\\:text-teal-500:hover {
            color: #38b2ac;
          }
          .w-full {
            width: 100%;
          }
          .h-60 {
            height: 15rem;
          }
          .object-cover {
            object-fit: cover;
          }
          .rounded-t-lg {
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          }
          .text-right {
            text-align: right;
          }
          .p-2 {
            padding: 0.5rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .font-bold {
            font-weight: 700;
          }
          .break-words {
            word-break: break-word;
          }
          .mr-3 {
            margin-right: 0.75rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
          .flex-wrap {
            flex-wrap: wrap;
          }
          .text-teal-500 {
            color: #38b2ac;
          }
          .font-bold {
            font-weight: 700;
          }
          .text-red-400 {
            color: #fc8181;
          }
          .line-through {
            text-decoration: line-through;
          }
          .mr-2 {
            margin-right: 0.5rem;
          }
          .text-gray-300 {
            color: #e2e8f0;
          }
          .bg-teal-500 {
            background-color: #38b2ac;
          }
          .m-1 {
            margin: 0.25rem;
          }
          .text-white {
            color: #ffffff;
          }
          .px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          .py-1 {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .hover\\:bg-teal-600:hover {
            background-color: #319795;
          }
          .transition-colors {
            transition: color 0.2s;
          }
          .duration-200 {
            transition-duration: 0.2s;
          }
          .text-\\[10px\\] {
            font-size: 10px;
          }
          .bg-blue-500 {
            background-color: #4299e1;
          }
          .fixed {
            position: fixed;
          }
          .inset-0 {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .bg-black {
            background-color: #000000;
          }
          .bg-opacity-50 {
            background-opacity: 0.5;
          }
          .flex {
            display: flex;
          }
          .items-center {
            align-items: center;
          }
          .justify-center {
            justify-content: center;
          }
          .z-50 {
            z-index: 50;
          }
          .bg-white {
            background-color: #ffffff;
          }
          .p-4 {
            padding: 1rem;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .shadow-lg {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .w-11\\/12 {
            width: 91.666667%;
          }
          .md\\:w-1\\/2 {
            width: 50%;
          }
          .relative {
            position: relative;
          }
          .overflow-y-auto {
            overflow-y: auto;
          }
          .max-h-full {
            max-height: 100%;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .absolute {
            position: absolute;
          }
          .top-2 {
            top: 0.5rem;
          }
          .right-2 {
            right: 0.5rem;
          }
          .text-gray-600 {
            color: #718096;
          }
          .hover\\:text-teal-500:hover {
            color: #38b2ac;
          }
        `}</style>
        <link rel="preload" as="image" href="/cover.jpg" />
        <script src="https://example.com/third-party-script.js" defer></script>
      </Head>
      <div className="relative overflow-hidden">
        <Image
          width={1920}
          height={1080}
          src="/cover.jpg"
          alt="Cover"
          className="w-full h-96 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold mb-4 text-center ">
            مرحبًا بكم في بيبي بلوم
          </h1>
          <p className="text-xl mb-4">أفضل المنتجات لطفلك</p>
          <button
            onClick={scrollToProducts}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
            استعرض المنتجات
          </button>
        </div>
      </div>
      <div className="container mx-auto p-12"></div>
      <div ref={productsRef} className="flex flex-col md:flex-row">
        <div className="flex flex-wrap justify-evenly w-full md:w-11/12">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Suspense fallback={<p>Loading...</p>}>{memoizedProducts}</Suspense>
          )}
        </div>
        <div className="w-full md:w-1/4">
          {showSideBar && (
            <Suspense fallback={<p>Loading...</p>}>
              <Sidebar />
            </Suspense>
          )}
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
