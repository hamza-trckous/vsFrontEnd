import { url2 } from "@/utils/api";
import axios from "axios";

export const sendHelp = async () => {
  try {
    const response = await axios.post(`${url2}/help`);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("Status:", error.response.status); // 400
      console.log("Data:", error.response.data); // { msg: "there is no correct information" }
    } else if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("An unknown error occurred.");
    }
    throw error;
  }
};
