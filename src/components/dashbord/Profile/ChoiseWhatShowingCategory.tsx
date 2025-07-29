"use client";
import React, { useEffect } from "react";
import ToggleSwitch from "@/components/Togle";
import { useCategory } from "@/context/CategoryContext";

const ChoiseWhatShowingCategory = ({
  setChosenCategory,
  chosenCategory
}: {
  setChosenCategory: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  chosenCategory: {
    [key: string]: boolean;
  };
}) => {
  const { category } = useCategory();

  useEffect(() => {
    if (category?.length) {
      const initialState: { [key: string]: boolean } = {};
      category.forEach((cat) => {
        initialState[cat._id] = cat.showing ?? false;
      });
      setChosenCategory(initialState);
    }
  }, [category]);

  const toggleCategory = (id: string, value: boolean) => {
    setChosenCategory((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Categories you want to show:
      </label>
      {category?.map((cat) => (
        <ToggleSwitch
          key={cat._id}
          label={cat.name}
          checked={!!chosenCategory[cat._id]}
          onChange={(checked) => toggleCategory(cat._id, checked)}
        />
      ))}
    </div>
  );
};

export default ChoiseWhatShowingCategory;
