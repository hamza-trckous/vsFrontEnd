// lib/getUserSettings.ts
import axios from "axios";
import { url } from "../api";

export async function getUserProfile() {
  let profile = null;

  // 2. profile
  try {
    const profileRes = await axios.get(`${url}/api/profile`);

    profile = profileRes.data;
    console.log(profile);
  } catch (err) {
    console.log(err);

    profile = null;
  }

  return {
    profile
  };
}
