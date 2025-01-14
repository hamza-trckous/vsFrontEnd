import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sheets`;

export const getSheetData = async (sheetId: string) => {
  const response = await axios.get(`${API_URL}/${sheetId}`);
  return response.data;
};
