import { profile } from "@/Types/Profile";
import axios from "axios";

export const getSettingsProfile = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const saveSettingsProfile = async (settings: profile) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
    settings,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
