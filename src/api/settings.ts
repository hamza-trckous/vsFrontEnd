import axios from "axios";

export const getSettings = async () => {
  const response = await axios.get("http://localhost:5000/api/settings", {
    withCredentials: true,
  });
  return response.data;
};

export const saveSettings = async (settings: {
  pixelId: string;
  accessToken: string;
}) => {
  const response = await axios.post(
    "http://localhost:5000/api/settings",
    settings,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
