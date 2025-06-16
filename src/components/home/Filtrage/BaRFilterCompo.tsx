import { useCategory } from "@/context/CategoryContext";
import React, { useState } from "react";

interface Props {
  onFilterChange: (
    key: string,
    value: string | string[] | number | number[] | undefined
  ) => void;
  handlFilter: () => void;
  filters: Record<string, unknown>;
}

const BaRFilterCompo = ({ onFilterChange, handlFilter, filters }: Props) => {
  const { category } = useCategory();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (
    key: string,
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(updated);
    onFilterChange(key, updated);
  };

  console.log(category);
  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 shadow-md rounded-md grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm text-black dark:text-white">
      {/* Shipping Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Shipping</h3>
        {["yes", "no"].map((value) => (
          <label
            key={value}
            className="flex items-center gap-2 mb-1 capitalize">
            <input
              type="checkbox"
              className="accent-teal-600"
              checked={selectedShipping.includes(value)}
              onChange={() =>
                handleCheckboxChange(
                  "withShipping",
                  value,
                  selectedShipping,
                  setSelectedShipping
                )
              }
            />
            {value}
          </label>
        ))}
      </div>

      {/* Rating Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Rating</h3>
        {Array.from(
          new Set(
            category
              ?.filter(
                (cat) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(cat.name)
              )
              .flatMap((cat) =>
                cat.products.map((prod) => prod.rating?.toString())
              )
              .filter(Boolean)
          )
        )
          .sort((a, b) => Number(b) - Number(a)) // optional: sort descending
          .map((value) => (
            <label key={value} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                className="accent-yellow-500"
                checked={selectedRatings.includes(value)}
                onChange={() =>
                  handleCheckboxChange(
                    "rating",
                    value,
                    selectedRatings,
                    setSelectedRatings
                  )
                }
              />
              {value} stars & up
            </label>
          ))}
      </div>

      {/* Price Range Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border rounded text-black dark:bg-gray-800"
            onChange={(e) =>
              onFilterChange(
                "minPrice",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border rounded text-black dark:bg-gray-800"
            onChange={(e) =>
              onFilterChange(
                "maxPrice",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      {/* Color Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Colors</h3>
        {[
          ...new Set(
            category
              ?.filter(
                (cat) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(cat.name)
              )
              .flatMap((cat) => cat.products.flatMap((prod) => prod.colors))
              .map((color) => color.toLowerCase())
          )
        ].map((color) => (
          <label
            key={color}
            className="flex items-center gap-2 mb-1 capitalize">
            <input
              type="checkbox"
              className="accent-indigo-500"
              checked={selectedColors.includes(color)}
              onChange={() =>
                handleCheckboxChange(
                  "color",
                  color,
                  selectedColors,
                  setSelectedColors
                )
              }
            />
            {color}
          </label>
        ))}
      </div>

      {/* Size Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Sizes</h3>
        {Array.from(
          new Set(
            category
              ?.filter(
                (cat) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(cat.name)
              )
              .flatMap((cat) =>
                cat.products.flatMap((prod) => prod.sizes || [])
              )
              .map((size) => size.toUpperCase())
          )
        )
          .sort()
          .map((size) => (
            <label key={size} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                className="accent-pink-500"
                checked={selectedSizes.includes(size)}
                onChange={() =>
                  handleCheckboxChange(
                    "size",
                    size,
                    selectedSizes,
                    setSelectedSizes
                  )
                }
              />
              {size}
            </label>
          ))}
      </div>

      {/* Category Filter */}
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Category </h3>
        {category?.map((cat) => (
          <label key={cat._id} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              className="accent-pink-500"
              checked={selectedCategories.includes(cat.name)}
              onChange={() =>
                handleCheckboxChange(
                  "category",
                  cat.name,
                  selectedCategories,
                  setSelectedCategories
                )
              }
            />
            {cat.name}
          </label>
        ))}
      </div>
      <button
        disabled={Object.keys(filters).length === 0}
        onClick={() => handlFilter()}
        className="bg-gray-400 p-[0.5rem] rounded-xl">
        chekProducts{" "}
      </button>
    </div>
  );
};

export default BaRFilterCompo;
