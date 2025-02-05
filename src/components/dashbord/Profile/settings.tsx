import { handleCoverChange, handleSave } from "@/utils/dashboard/Profile";
import React, { useState } from "react";
import LogoPart from "./LogoPart";

const Settings = ({
  logo,
  setlogo,
  nameOfBrand,
  setnameOfBrand,
  cover,
  setCover,

  setAlertMessage,
  setAlertType,
  fetchSettings,
  setCoverType,
}: {
  logo: string;
  setlogo: React.Dispatch<React.SetStateAction<string>>;
  nameOfBrand: string;
  setnameOfBrand: React.Dispatch<React.SetStateAction<string>>;
  cover: string;
  setCover: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchSettings: () => Promise<void>;
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>;
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <LogoPart
        logo={logo}
        setlogo={setlogo}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
      />
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
            setCover,
            setCoverType
          )
        }
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your cover photo"
      />
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="nameOfBrand">
        Name of Brand
      </label>
      <input
        type="text"
        id="nameOfBrand"
        value={nameOfBrand}
        onChange={(e) => setnameOfBrand(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Enter your nameOfBrand"
      />
      <button
        onClick={() =>
          handleSave({
            logo,
            nameOfBrand,
            cover,
            setIsSaved,
            setAlertMessage,
            setAlertType,
            fetchSettings,
          })
        }
        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
        Save
      </button>
      {isSaved && (
        <p className="text-green-500 mt-4">Settings saved successfully!</p>
      )}
    </div>
  );
};

export default Settings;
