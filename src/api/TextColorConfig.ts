import axios from "axios";
import { url } from "@/utils/api";
import { ColorName } from "@/utils/theme";

export const getColorText = async (
  Color: ColorName = "teal"
): Promise<ColorName> => {
  const response = await axios.get(`${url}/api/ThemeColortext?Color=${Color}`, {
    withCredentials: true,
  });
  return response.data;
};
