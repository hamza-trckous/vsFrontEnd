"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [config, setConfig] = useState({
    range: "",
    spreadsheetId: "",
    apiKey: "",
    values: [["Sample Data"]], // Add default values
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          `${process.env.MONGO_URI}/api/sheets/config`
        );
        setConfig({
          range: response.data.range || "",
          spreadsheetId: response.data.spreadsheetId || "",
          apiKey: response.data.apiKey || "",
          values: [["Sample Data"]], // Ensure values are set
        });
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

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
      await axios.post(`${process.env.MONGO_URI}/api/sheets/update`, {
        range: config.range,
        spreadsheetId: config.spreadsheetId,
        apiKey: config.apiKey,
        values: config.values, // Ensure values are included in the request body
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
          <label className="block mb-2 font-bold">Range:</label>
          <input
            type="text"
            name="range"
            value={config.range}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Spreadsheet ID:</label>
          <input
            type="text"
            name="spreadsheetId"
            value={config.spreadsheetId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">API Key:</label>
          <input
            type="text"
            name="apiKey"
            value={config.apiKey}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default Page;
