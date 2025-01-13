"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [config, setConfig] = useState({
    spreadsheetId: "default",
    values: [["Sample Data"]],
    CLIENT_ID: "default",
    CLIENT_SECRET: "default",
    REDIRECT_URI: "http://localhost:5000/api/oauth2callback",
    REFRESH_TOKEN: "default",

    // Add default values
  });
  const [TherIsToken, settoken] = useState(false);
  const [ShowingUrl, setShowingUrl] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/sheets/config"
        );
        setConfig((prevConfig) => ({
          ...prevConfig,
          spreadsheetId: response.data.spreadsheetId || " default",
          CLIENT_ID: response.data.CLIENT_ID || " default ",
          CLIENT_SECRET: response.data.CLIENT_SECRET || " default ",
          REDIRECT_URI:
            response.data.REDIRECT_URI ||
            " http://localhost:5000/api/oauth2callback ",
          REFRESH_TOKEN: response.data.REFRESH_TOKEN || " default",
        }));

        if (!response.data.REFRESH_TOKEN) {
          settoken(true);
        }

        console.log(response.data);
        if (
          response.data.CLIENT_ID &&
          response.data.CLIENT_SECRET &&
          response.data.REDIRECT_URI &&
          response.data.spreadsheetId &&
          !response.data.REFRESH_TOKEN
        ) {
          console.log(ShowingUrl);
          setShowingUrl(true);
          console.log(ShowingUrl);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, [ShowingUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sheets/config", {
        spreadsheetId: config.spreadsheetId,
        CLIENT_ID: config.CLIENT_ID,
        CLIENT_SECRET: config.CLIENT_SECRET,
        REDIRECT_URI: config.REDIRECT_URI,
      });
      alert("Config updated successfully");
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Spreadsheet ID:</label>
          <input
            type="text"
            name="spreadsheetId"
            value={config.spreadsheetId}
            onChange={handleChange}
            placeholder={config.spreadsheetId}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">CLIENT_ID:</label>
          <input
            type="text"
            name="CLIENT_ID"
            value={config.CLIENT_ID}
            onChange={handleChange}
            placeholder={config.CLIENT_ID}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">CLIENT_SECRET:</label>
          <input
            type="text"
            name="CLIENT_SECRET"
            value={config.CLIENT_SECRET}
            onChange={handleChange}
            placeholder={config.CLIENT_SECRET}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">REDIRECT_URI:</label>
          <input
            type="text"
            name="REDIRECT_URI"
            value={config.REDIRECT_URI}
            onChange={handleChange}
            placeholder={config.REDIRECT_URI}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">REFRESH_TOKEN:</label>
          <input
            disabled={!config.REFRESH_TOKEN}
            type="text"
            name="REFRESH_TOKEN"
            value={config.REFRESH_TOKEN}
            onChange={handleChange}
            placeholder={config.REFRESH_TOKEN}
            className={`${
              !TherIsToken ? "bg-green-300" : "bg-red-300"
            } w-full p-2 border border-gray-300 rounded`}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Save
        </button>
      </form>

      {ShowingUrl && (
        <div className="mt-4">
          refrech token رابط الحصول على{" "}
          <a href="http://localhost:5000/api/auth" className="text-blue-500">
            here
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
