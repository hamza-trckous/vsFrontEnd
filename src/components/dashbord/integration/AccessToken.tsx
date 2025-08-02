"use client";

import React from "react";

const AccessToken = ({
  accessToken,
  setAccessToken,
}: {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      {" "}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="accessToken"
      >
        Access Token
      </label>
      <input
        type="text"
        id="accessToken"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your Access Token"
      />
    </>
  );
};

export default AccessToken;
