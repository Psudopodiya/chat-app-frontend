import axios from "axios";

// Replace with your backend URL
const BASE_URL = "http://127.0.0.1:8000/api/";

// API call for login
export const getUser = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  const response = await axios.get(`${BASE_URL}users/profile/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
