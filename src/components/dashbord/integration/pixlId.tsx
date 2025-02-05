"use client";

import React from "react";

const PixlId = ({
  pixelId,
  setPixelId,
}: {
  pixelId: string;
  setPixelId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="pixelId">
        Facebook Pixel ID
      </label>
      <input
        type="text"
        id="pixelId"
        value={pixelId}
        onChange={(e) => setPixelId(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your Facebook Pixel ID"
      />
    </>
  );
};

export default PixlId;
