"use client";
import { useProfileContext } from "@/context/ProfileContext";
import React from "react";

const PrincipalEmailPart = () => {
  const { Profile, setProfile } = useProfileContext();

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand"
      >
        Principal Emal is
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={Profile?.email?.name || ""}
        onChange={(e) =>
          setProfile((pre) => ({
            ...pre,
            email: { ...pre.email, name: e.target.value },
          }))
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your Principal Email"
      />
    </>
  );
};

export default PrincipalEmailPart;
