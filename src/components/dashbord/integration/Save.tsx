"use client";

import { saveSettings } from "@/api/settings";
import React from "react";

const Save = ({
  fetchSettings,
  setIsSaved,
  pixelId,
  accessToken,
  setAlertMessage,
  setAlertType,
}: {
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setAlertType: React.Dispatch<React.SetStateAction<"success" | "error">>;
  pixelId: string;
  accessToken: string;
  fetchSettings: () => Promise<void>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSave = async () => {
    try {
      await saveSettings({ pixelId, accessToken });
      setIsSaved(true);
      await fetchSettings(); // Fetch the updated settings after saving
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(`Error: ${error.message}`);
      } else {
        setAlertMessage("An unknown error occurred.");
      }
      setAlertType("error");
    }
  };
  return (
    <button
      onClick={handleSave}
      className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
    >
      Save
    </button>
  );
};

export default Save;
