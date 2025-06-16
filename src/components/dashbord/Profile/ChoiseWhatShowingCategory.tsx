"use client";
import { useCategory } from "@/context/CategoryContext";
import React, { useEffect, useState } from "react";
import { updateCategory } from "@/api/category"; // ✅ Adjust path if needed
import { Category } from "@/Types/Categorys";

const ChoiseWhatShowingCategory = () => {
  const { category } = useCategory();

  const [chosenCategory, setChosenCategory] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    console.log("categorys", category);
    if (category?.length) {
      const initialState: { [key: string]: boolean } = {};
      category.forEach((cat) => {
        initialState[cat._id] = cat.showing ?? false;
      });
      setChosenCategory(initialState);
    }
  }, [category]);

  const toggleCategory = (id: string) => {
    setChosenCategory((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const handleSave = async () => {
    if (!category?.length) return;

    const updates = category.map((cat) =>
      updateCategory({
        ...cat,
        showing: chosenCategory[cat._id]
      } as Category)
    );

    try {
      await Promise.all(updates);
      alert("Categories updated!");
    } catch (error) {
      console.error("Failed to update categories:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Categories you want to show:
      </label>
      {category?.map((e) => (
        <label key={e._id} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={!!chosenCategory[e._id]}
            onChange={() => toggleCategory(e._id)}
          />
          {e.name}
        </label>
      ))}

      <button
        onClick={handleSave}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  );
};

export default ChoiseWhatShowingCategory;
