"use client";

import Image from "next/image";
import React from "react";
import { handleCoverChange } from "@/utils/dashboard/Profile";
import { useProfileContext } from "@/context/ProfileContext";

const CoverPart = ({
  setCoverType,
  coverType,

  setAlertMessage,
  setAlertType
}: {
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>;
  coverType: "image" | "video";
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
}) => {
  const { Profile, setProfile } = useProfileContext();

  return (
    <>
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
            setProfile
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
    </>
  );
};

export default CoverPart;
