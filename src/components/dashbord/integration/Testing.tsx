"use client";

import { testingintegration } from "@/utils/dashboard/integration";
import React from "react";

const Testing = ({
  setAlertMessage,
  setAlertType,
  pixelId,
}: {
  pixelId: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setAlertType: React.Dispatch<React.SetStateAction<"success" | "error">>;
}) => {
  const handleTest = async () => {
    try {
      testingintegration({ pixelId });

      setAlertMessage("Success! Go check your Facebook events.");
      setAlertType("success");
    } catch (error) {
      console.error("Error during test:", error);
      setAlertMessage(
        "An error occurred while processing your request. Please try again later.",
      );
      setAlertType("error");
    }
  };
  return (
    <button
      onClick={handleTest}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 mt-4"
    >
      Testing
    </button>
  );
};

export default Testing;
