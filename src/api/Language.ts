import axios from "axios";
import { url } from "@/utils/api";
import { LanguageConfig } from "@/Types/LanguageConfig";

export const getLanguage = async (
  lang: "AR" | "EN" = "EN",
): Promise<LanguageConfig> => {
  const response = await axios.get(`${url}/api/translate?lang=${lang}`, {
    withCredentials: true,
  });
  return response.data;
};
