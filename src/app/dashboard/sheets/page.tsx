"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/dashbord/multualCompenents/Container";

const Page = () => {
  const [config, setConfig] = useState({
    spreadsheetId: "",
    apiKey: "",
    values: [["Sample Data"]], // Add default values
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sheets/config`
        );
        setConfig({
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sheets/update`,
        {
          spreadsheetId: config.spreadsheetId,
          apiKey: config.apiKey,
          values: config.values, // Ensure values are included in the request body
        }
      );
      alert("Config updated successfully");
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
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
    </Container>
  );
};

export default Page;
