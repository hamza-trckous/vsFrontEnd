"use client";
import { useTheme } from "@/context/themeContext";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { handleSave } from "@/utils/dashboard/Profile";
import { useProfileContext } from "@/context/ProfileContext";
import { themeColors } from "@/utils/theme";
import { useAlert } from "@/context/useAlert";
import { updateCategory } from "@/api/category";
import { Category } from "@/Types/Categorys";
import { useCategory } from "@/context/CategoryContext";

const HandleSavingLogic = ({
  fetchSettings,
  chosenCategory
}: {
  fetchSettings: () => Promise<void>;
  chosenCategory: {
    [key: string]: boolean;
  };
}) => {
  const { currentColor } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [saveProgress, setSaveProgress] = useState<number>(0);
  const { Profile } = useProfileContext();
  const { setAlertMessage, setAlertType } = useAlert();
  const { category } = useCategory();

  const handleFullSave = async () => {
    setSaveProgress(20); // Start progress

    try {
      // Save profile settings
      await handleSave({
        currentColor,
        Profile,
        setIsSaved,
        setAlertMessage,
        setAlertType,
        fetchSettings
      });

      // Save categories
      if (category?.length) {
        const updates = category.map((cat) =>
          updateCategory({
            ...cat,
            showing: chosenCategory[cat._id]
          } as Category)
        );

        await Promise.all(updates);
      }

      setSaveProgress(100); // Finished
      setIsSaved(true);
      setAlertMessage("Settings saved successfully!");
      setAlertType("success");
    } catch (error) {
      console.error("Failed to save:", error);
      setAlertMessage("Failed to save settings.");
      setAlertType("error");
    }

    setTimeout(() => {
      setSaveProgress(0); // Reset progress
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleFullSave}
        className={`bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 text-white px-4 py-2 rounded-lg hover:bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-600 transition-colors duration-200`}>
        Save
      </button>

      <div className="mt-4 w-full bg-gray-200 rounded-full overflow-hidden h-2">
        <Progress value={saveProgress} className="h-2 bg-gray-500" />
      </div>

      {isSaved && (
        <p className="text-green-500 mt-4">Settings saved successfully!</p>
      )}
    </>
  );
};

export default HandleSavingLogic;
