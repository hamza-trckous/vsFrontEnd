"use client";
import { getAllProducts } from "@/api/product";
import {
  Categoryoption,
  Productoption,
  ProductPaginationOnly
} from "@/Types/ProductPart";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoryProductsWithPagination } from "@/api/category";
import TitleRtl from "../dashbord/multualCompenents/Title";
import CardForProduct from "../cardForProduct";
import Sidebar from "./Sidebar";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";

const MainPartShowingProducts = ({
  initialProducts,

  category,
  categoryId,
  searchParams
}: Categoryoption | Productoption) => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { currentColor } = useTheme();

  const [showSideBar, setShowSideBar] = useState(false);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && showSideBar) {
      fetchNextPage();
    }
  }, [showSideBar, inView]);
  const {
    data: products,
    isLoading,

    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<ProductPaginationOnly>({
    queryKey: category ? ["productsCategory", categoryId] : ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        if (category) {
          const data = await getCategoryProductsWithPagination(
            categoryId,
            pageParam as number,
            4
          );
          return {
            products: data.products || [],
            totalProducts: data.totalProducts || 0,
            hasMore: (data.products || []).length === 4
          };
        } else {
          const data = await getAllProducts({
            page: pageParam as number,
            limit: 4
          });
          return {
            products: data.products || [],
            totalProducts: data.totalProducts || 0,
            hasMore: !category && (data.products || []).length === 4
          };
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        return {
          products: [],
          totalProducts: 0,
          hasMore: false
        };
      }
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    initialData: {
      pages: [
        {
          products: initialProducts || [],
          totalProducts: (initialProducts || []).length,
          hasMore: (initialProducts || []).length === 4
        }
      ],
      pageParams: [1]
    },
    initialPageParam: 1
  });

  const memoizedProducts = useMemo(() => {
    if (!products?.pages) return [];
    const allProducts = products.pages.flatMap((page) => page.products || []);
    return allProducts.map((product, index) => {
      const isLast = index === allProducts.length - 1;
      return (
        <CardForProduct
          ref={showSideBar && isLast ? ref : null}
          forCart={false}
          key={product._id}
          id={product._id}
          product={{
            images: product.images,
            name: product.name,
            price: product.price,
            discountedPrice: product.discountedPrice,
            rating: product.rating,
            description: product.description,
            reviews: product.reviews,
            colors: product.colors,
            sizes: product.sizes,
            _id: product._id,
            withShipping: product.withShipping,
            category: product.category
          }}
          index={index}
        />
      );
    });
  }, [products, ref]);

  const renderProducts = () => {
    if (isLoading) {
      return <p id="Loading"> مرحبًا بكم في بيبي بلوم...</p>;
    }

    if (!memoizedProducts || memoizedProducts.length === 0) {
      return <p>No products found</p>;
    }

    return memoizedProducts;
  };

  return (
    <div ref={productsRef} className="flex flex-col md:flex-row">
      <div className="flex flex-wrap justify-evenly w-full md:w-11/12 mt-4 relative">
        <Suspense fallback={<p>Loading...</p>}>
          <br />
          <TitleRtl title={searchParams?.name || "Products"} />
          {renderProducts()}
        </Suspense>
        <div className=" w-full flex justify-center items-center m-[1rem]  ">
          {!showSideBar && (
            <button
              className={`p-[1rem] bg-${
                themeColors[currentColor ?? "teal"]?.basics
              }-200 flex items-end justify-end h-[3rem] rounded-xl`}
              onClick={() => {
                setShowSideBar(true);
                fetchNextPage();
              }}>
              Show More
            </button>
          )}
        </div>
        {/* Only show infinite scroll for non-category pages */}
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>

      <div className="w-full md:w-1/4">
        {showSideBar && (
          <Suspense fallback={<p>Loading...</p>}>
            <Sidebar />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default MainPartShowingProducts;
