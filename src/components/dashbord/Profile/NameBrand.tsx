"use client";
import { useProfileContext } from "@/context/ProfileContext";
import React from "react";

const NameBrand = () => {
  const { Profile, setProfile } = useProfileContext();

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand">
        Name of Brand
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={Profile?.nameOfBrand?.name || ""}
        onChange={(e) =>
          setProfile((pre) => ({
            ...pre,
            nameOfBrand: { ...pre.nameOfBrand, name: e.target.value }
          }))
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your nameOfBrand"
      />{" "}
    </>
  );
};

export default NameBrand;
