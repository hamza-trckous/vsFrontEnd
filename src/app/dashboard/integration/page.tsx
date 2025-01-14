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

      const email = "user@example.com"; // Replace with actual user email
      const phone = "1234567890"; // Replace with actual user phone number
      const firstName = "John"; // Replace with actual user first name
      const lastName = "Doe"; // Replace with actual user last name
      const dob = "1990-01-01"; // Replace with actual user date of birth
      const zip = "12345"; // Replace with actual user zip code
      const city = "New York"; // Replace with actual user city
      const state = "NY"; // Replace with actual user state

      // Hash the email, phone, first name, last name, date of birth, zip code, city, and state before sending to Facebook
      const hashedEmail = CryptoJS.SHA256(email).toString();
      const hashedPhone = CryptoJS.SHA256(phone).toString();
      const hashedFirstName = CryptoJS.SHA256(firstName).toString();
      const hashedLastName = CryptoJS.SHA256(lastName).toString();
      const hashedDob = CryptoJS.SHA256(dob).toString();
      const hashedZip = CryptoJS.SHA256(zip).toString();
      const hashedCity = CryptoJS.SHA256(city).toString();
      const hashedState = CryptoJS.SHA256(state).toString();

      // Get fbp from cookies
      const fbp = getCookie("_fbp");

      // Get client IP address from backend API using axios
      const response = await axios.get(
        `${process.env.NEXT_APP_BACKEND_URL}/api/get-ip`
      );
      const clientIpAddress = response.data.ip;

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
          client_ip_address: clientIpAddress, // Use the actual client IP address
          client_user_agent: navigator.userAgent, // Get the user agent from the browser
          fbp: typeof fbp === "string" ? fbp : "", // Ensure fbp is a string
          fbc: "fb_click_id", // Replace with actual Facebook click ID
          external_id: "external_id", // Replace with actual external ID if available
          fb_login_id: "facebook_login_id", // Replace with actual Facebook login ID if available
        },
        custom_data: {
          currency: "USD",
          value: 0,
        },
      };

      console.log("Event data:", eventData);

      // Send event data to your backend or directly to Facebook
      await trackConversion(eventData);
      setAlertMessage("Success! Go check your Facebook events.");
      setAlertType("success");
    } catch (error) {
      console.error("Error during test:", error);
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data?.error?.code === 190 &&
          error.response?.data?.error?.error_subcode === 463
        ) {
          console.error("Access token has expired. Please refresh the token.");
          // Optionally, you can implement a retry mechanism here
        } else {
          console.error(
            `Error: ${error.response?.data?.message || error.message}`
          );
        }
      } else if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred.");
      }
      // Do not show token-related errors to the customer
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
