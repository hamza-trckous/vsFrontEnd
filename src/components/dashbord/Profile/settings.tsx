"use client";
import { Progress } from "@/components/ui/progress"; // adjust path if needed

import { handleCoverChange, handleSave } from "@/utils/dashboard/Profile";
import React, { useState } from "react";
import LogoPart from "./LogoPart";
import { ColorName, themeColors } from "@/utils/theme";
import { profile } from "@/Types/Profile";
import Image from "next/image";
import { useProfileContext } from "@/context/ProfileContext";
import Toggles from "./Toggles";
import ChoiseWhatShowingCategory from "./ChoiseWhatShowingCategory";

const Settings = ({
  setprofile,
  currentColor,
  profile,
  setAlertMessage,
  setAlertType,
  fetchSettings,
  setCoverType,
  coverType
}: {
  coverType: "image" | "video";
  setprofile: React.Dispatch<React.SetStateAction<profile>>;
  profile: profile;
  currentColor: ColorName | undefined;

  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchSettings: () => Promise<void>;
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>;
}) => {
  const { Profile } = useProfileContext();

  const [isSaved, setIsSaved] = useState(false);
  const [saveProgress, setSaveProgress] = useState<number>(0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center content-center flex-col">
      <LogoPart
        logo={profile?.logo?.src}
        setprofile={setprofile}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
      />
      <Toggles />
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="logo">
        Cover (Image: max 5MB, Video: max 100MB){" "}
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
        id="cover"
        onChange={(e) =>
          handleCoverChange(
            e,
            setAlertMessage,
            setAlertType,
            setCoverType,
            setprofile
          )
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your cover photo"
      />
      {/* Cover Preview */}
      <div className="bg-white shadow-md grid grid-cols-2 rounded-lg p-4 mt-3">
        {Profile.cover && (
          <div className="mt-2">
            {coverType === "image" && Profile.cover.name ? (
              <Image
                src={Profile?.cover?.name}
                alt="Cover preview"
                width={400}
                height={200}
                className="rounded-lg object-cover w-full"
              />
            ) : coverType === "video" && Profile.cover.name ? (
              <video
                controls
                className="rounded-lg w-full"
                src={Profile.cover.name}>
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        )}
      </div>
      {/* Cover Preview */}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand">
        Name of Brand
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={profile?.nameOfBrand?.name || ""}
        onChange={(e) =>
          setprofile((pre) => ({
            ...pre,
            nameOfBrand: { ...pre.nameOfBrand, name: e.target.value }
          }))
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your nameOfBrand"
      />{" "}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand">
        Slogon
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={profile?.slogon?.name || ""}
        onChange={(e) =>
          setprofile((pre) => ({
            ...pre,
            slogon: { ...pre.slogon, name: e.target.value }
          }))
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your slogon"
      />
      <ChoiseWhatShowingCategory />
      <button
        onClick={async () => {
          setSaveProgress(20); // start progress
          await handleSave({
            currentColor,
            profile,
            setIsSaved,
            setAlertMessage,
            setAlertType,
            fetchSettings
          });
          setSaveProgress(100); // completed

          setTimeout(() => {
            setSaveProgress(0);
          }, 500); // reset after 0.5s
        }}
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
      )}{" "}
    </div>
  );
};

export default Settings;
