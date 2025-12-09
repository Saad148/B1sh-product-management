// import axios from "axios";
// import { RefreshAccessToken } from "./RefreshAccessToken";
// import { BASE_URL } from "../constants";

// const getProfile = async () => {
//   const token = localStorage.getItem("accessToken");

//   try {
//     const res = await axios.get(`${BASE_URL}/auth/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   } catch (err: any) {
//     if (err.response?.status === 401) {
//       const newToken = await RefreshAccessToken();

//       if (!newToken) {
//         return null;
//       }

//       const res = await axios.get(`${BASE_URL}/auth/me`, {
//         headers: { Authorization: `Bearer ${newToken}` },
//       });
//       return res.data;
//     }
//   }
// };
// getProfile();

// export default getProfile;
