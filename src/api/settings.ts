import { settings } from "@/Types/Settings";
import axios from "axios";

export const getSettings = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const saveSettings = async (settings: settings) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`,
    settings,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
