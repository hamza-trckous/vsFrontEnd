import { url } from "@/utils/api";
import axios from "axios";

const API_URL = `${url}/api/sheets`;

export const getSheetData = async (sheetId: string) => {
  const response = await axios.get(`${API_URL}/${sheetId}`);
  return response.data;
};
