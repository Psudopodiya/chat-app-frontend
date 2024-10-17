import axios from "axios";

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

export const updateProfile = async (formData: FormData) => {
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
    },
  );
  return response.data;
};

export const getUserList = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  const response = await axios.get(`${BASE_URL}users/list/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
