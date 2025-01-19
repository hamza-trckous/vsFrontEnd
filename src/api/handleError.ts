import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const isTokenExpired =
      error.response?.data?.error?.code === 190 &&
      error.response?.data?.error?.error_subcode === 463;

    return isTokenExpired
      ? "Access token expired"
      : error.response?.data?.message || error.message;
  }

  return error instanceof Error ? error.message : "Unknown error occurred";
};
