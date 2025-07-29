import { useProfileContext } from "@/context/ProfileContext";
import React from "react";

const SlogonPart = () => {
  const { Profile, setProfile } = useProfileContext();

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand">
        Slogon
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={Profile?.slogon?.name || ""}
        onChange={(e) =>
          setProfile((pre) => ({
            ...pre,
            slogon: { ...pre.slogon, name: e.target.value }
          }))
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your slogon"
      />
    </>
  );
};

export default SlogonPart;
