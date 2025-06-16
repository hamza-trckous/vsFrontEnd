"use client";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React, { ReactNode, useEffect, useState, useTransition } from "react";
import { Filter, Search } from "lucide-react";
import BaRFilterCompo from "./BaRFilterCompo";
import { filterProducts } from "@/api/product";
import { Product } from "@/Types/ProductPart";
import { useAuth } from "@/context/AuthContext";
import { useAllProducts } from "@/hooks/useAllProducts";

const Filtrage = ({
  children,
  setfiltredProducts
}: {
  children: ReactNode;
  setfiltredProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
}) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const { setLoading } = useAuth();
  const handlFilter = async (customFilters = filters) => {
    setLoading(true);
    const response = await filterProducts(customFilters);
    if (response) {
      setfiltredProducts(response);
      setLoading(false);
    }
    console.log(response);
  };
  const handleFilterChange = (
    key: string,
    value: string | string[] | number | number[] | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(value) ? value.join(",") : value
    }));
  };
  const { products } = useAllProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      startTransition(() => {
        setfiltredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
          )
        );
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);
  console.log(products);
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  const { currentColor } = useTheme();
  const [BarFilter, setBarFilter] = useState(false);
  return (
    <div className="relative w-full">
      {/* Top bar with Filter + Search */}
      <div
        className={`w-full bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-400 flex items-center justify-between px-4 py-2`}>
        {/* Left-side Filter */}
        <div
          onClick={() => setBarFilter(!BarFilter)}
          className="flex items-center gap-2 text-black cursor-pointer">
          <Filter className="w-5 h-5 text-black" />
          <label className="m-[0.5rem]">Filter</label>
        </div>

        {/* Centered Search Input */}
        <div className="relative w-[90%] flex items-center">
          <input
            type="text"
            className="h-[3rem] rounded-full w-full bg-white p-[0.5rem] pl-10 peer"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Search className="w-5 h-5 text-gray-500 absolute top-1/2 -translate-y-1/2 left-3 peer-focus:hidden" />
        </div>
      </div>
      {isPending && <p className="text-sm text-gray-500">Searching...</p>}

      {/* Optional section below */}
      {BarFilter && (
        <BaRFilterCompo
          filters={filters}
          handlFilter={handlFilter}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Main content */}
      {children}
    </div>
  );
};

export default Filtrage;
