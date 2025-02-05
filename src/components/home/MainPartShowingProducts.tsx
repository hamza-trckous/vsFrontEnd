"use client";
import { getAllProducts } from "@/api/product";
import {
  Categoryoption,
  Productoption,
  ProductPaginationOnly,
} from "@/Types/ProductPart";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getCategoryProducts } from "@/api/category";
import TitleRtl from "../dashbord/multualCompenents/Title";

const Sidebar = dynamic(() => import("@/components/home/Sidebar"), {
  ssr: false,
});
const CardForProduct = dynamic(() => import("@/components/cardForProduct"), {
  ssr: false,
});

const MainPartShowingProducts = ({
  initialProducts,
  productsRef,
  category,
  categoryId,
  searchParams,
}: Categoryoption | Productoption) => {
  const { ref, inView } = useInView();
  const [showSideBar, setShowSideBar] = useState(false);

  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ProductPaginationOnly>({
    queryKey: category ? ["productsCategory", categoryId] : ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        if (category) {
          const data = await getCategoryProducts(categoryId);
          return {
            products: data || [],
            totalProducts: (data || []).length,
            hasMore: false,
          };
        } else {
          const data = await getAllProducts({ page: pageParam, limit: 3 });
          return {
            products: data.products || [],
            totalProducts: data.totalProducts || 0,
            hasMore: !category && (data.products || []).length === 3,
          };
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        return {
          products: [],
          totalProducts: 0,
          hasMore: false,
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
          hasMore: !category,
        },
      ],
      pageParams: [1],
    },
  });

  useEffect(() => {
    if (!category && inView && hasNextPage) {
      setShowSideBar(true);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, category]);

  const memoizedProducts = useMemo(() => {
    if (!products?.pages) return [];

    return products.pages.flatMap((page) =>
      (page?.products || []).map((product, index) => (
        <CardForProduct
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
            category: product.category,
          }}
          index={index}
        />
      ))
    );
  }, [products]);

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
      <div className="flex flex-wrap justify-evenly w-full md:w-11/12">
        <Suspense fallback={<p>Loading...</p>}>
          <br />
          <TitleRtl title={searchParams?.name || "Category"} />
          {renderProducts()}
        </Suspense>

        {/* Only show infinite scroll for non-category pages */}
        {!category && (
          <div
            ref={ref}
            className="w-full h-10 flex items-center justify-center">
            {isFetchingNextPage && <p>Loading more...</p>}
          </div>
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
  );
};

export default MainPartShowingProducts;
