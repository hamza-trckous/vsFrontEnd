"use client";
import React, { useState, useEffect } from "react";
import AlertModal from "@/components/AlertModal"; // Import AlertModal

import { getSettingsProfile, saveSettingsProfile } from "@/api/profile";
import Image from "next/image";

const IntegrationPage = () => {
  const [logo, setlogo] = useState("");
  const [nameOfBrand, setnameOfBrand] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const fetchSettings = async () => {
    try {
      const settings = await getSettingsProfile();
      console.log("Fetched Profile", settings);
      setlogo(settings.logo || "");
      setnameOfBrand(settings.nameOfBrand || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await saveSettingsProfile({ logo, nameOfBrand });
      setIsSaved(true);
      console.log("Settings saved successfully!");
      await fetchSettings(); // Fetch the updated settings after saving
    } catch (error) {
      console.error("Error saving settings:", error);
      if (error instanceof Error) {
        setAlertMessage(`Error: ${error.message}`);
      } else {
        setAlertMessage("An unknown error occurred.");
      }
      setAlertType("error");
    }
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setlogo(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-4 w-1/3">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="logo">
          logo
        </label>
        <input
          type="file"
          id="logo"
          onChange={handlePhotoChange}
          className="border rounded-lg p-2 w-full mb-4"
          placeholder="Enter your logo"
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
          onClick={handleSave}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
          Save
        </button>
        {isSaved && (
          <p className="text-green-500 mt-4">Settings saved successfully!</p>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mt-3">
        {logo && (
          <Image
            width={200}
            height={200}
            src={logo}
            alt="logo"
            className="rounded-lg w-full h-64 object-cover mb-4"
          />
        )}
      </div>
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default IntegrationPage;
