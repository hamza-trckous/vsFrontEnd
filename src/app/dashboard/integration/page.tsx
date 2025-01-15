"use client";
import React, { useState, useEffect } from "react";
import { saveSettings, getSettings } from "@/api/settings"; // Import saveSettings and getSettings API
import { injectFacebookPixel, trackConversion } from "@/api/TrackConversion"; // Import injectFacebookPixel and trackConversion
import AlertModal from "@/components/AlertModal"; // Import AlertModal
import { getCookie } from "cookies-next"; // Update the import statement for cookies-next
import CryptoJS from "crypto-js";
import axios from "axios";

const IntegrationPage = () => {
  const [pixelId, setPixelId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const fetchSettings = async () => {
    try {
      const settings = await getSettings();
      console.log("Fetched", settings);
      setPixelId(settings.pixelId || "");
      setAccessToken(settings.accessToken || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await saveSettings({ pixelId, accessToken });
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

  const handleTest = async () => {
    try {
      injectFacebookPixel(pixelId);

      const email = "user@example.com";
      const phone = "1234567890";
      const firstName = "John";
      const lastName = "Doe";
      const dob = "1990-01-01";
      const zip = "12345";
      const city = "New York";
      const state = "NY";

      const hashedEmail = CryptoJS.SHA256(email).toString();
      const hashedPhone = CryptoJS.SHA256(phone).toString();
      const hashedFirstName = CryptoJS.SHA256(firstName).toString();
      const hashedLastName = CryptoJS.SHA256(lastName).toString();
      const hashedDob = CryptoJS.SHA256(dob).toString();
      const hashedZip = CryptoJS.SHA256(zip).toString();
      const hashedCity = CryptoJS.SHA256(city).toString();
      const hashedState = CryptoJS.SHA256(state).toString();

      const fbp = getCookie("_fbp");

      // Get client IP address from backend API
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-ip`
      );
      let clientIpAddress = response.data.ip;

      // Validate the IP address format
      const isValidIp = (ip: string) =>
        /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(
          ip
        );

      if (!isValidIp(clientIpAddress)) {
        console.warn(
          "Invalid IP address retrieved. Skipping client_ip_address."
        );
        clientIpAddress = null; // Skip sending the IP address
      }

      const eventData = {
        event_name: "tesT3",
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: hashedEmail,
          ph: hashedPhone,
          fn: hashedFirstName,
          ln: hashedLastName,
          dob: hashedDob,
          zp: hashedZip,
          ct: hashedCity,
          st: hashedState,
          ...(clientIpAddress && { client_ip_address: clientIpAddress }), // Only include if valid
          client_user_agent: navigator.userAgent,
          fbp: typeof fbp === "string" ? fbp : "",
          fbc: "fb_click_id",
          external_id: "external_id",
          fb_login_id: "facebook_login_id",
        },
        custom_data: {
          currency: "USD",
          value: 0,
        },
      };

      console.log("Event data:", eventData);

      await trackConversion(eventData);
      setAlertMessage("Success! Go check your Facebook events.");
      setAlertType("success");
    } catch (error) {
      console.error("Error during test:", error);
      setAlertMessage(
        "An error occurred while processing your request. Please try again later."
      );
      setAlertType("error");
    }
  };

  return (
    <div className="container mx-auto p-4 w-1/3">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="accessToken">
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
        <button
          onClick={handleSave}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
          Save
        </button>
        {isSaved && (
          <p className="text-green-500 mt-4">Settings saved successfully!</p>
        )}
        <button
          onClick={handleTest}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 mt-4">
          Testing
        </button>
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
