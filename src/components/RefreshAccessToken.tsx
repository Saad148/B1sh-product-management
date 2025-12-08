import axios from "axios";
import { BASE_URL } from "../constants";

export const RefreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (err: any) {
    console.error(err);
    localStorage.clear();
    return null;
  }
};
