import axios from "axios";

// Replace with your backend URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const updateProfile = async (formData: {
  username?: string;
  bio?: string;
  email?: string;
  profile_image?: string;
}) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  const response = await axios.post(
    `${BASE_URL}users/edit_profile/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
