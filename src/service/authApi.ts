import axios from "axios";

// Replace with your backend URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// API call for login
export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}token/`, credentials);
  return response.data; // Expected to return access and refresh tokens
};

// API call for registration
export const registerUser = async (userData: {
  username: string;
  password: string;
  email: string;
}) => {
  const response = await axios.post(`${BASE_URL}users/register/`, userData);
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axios.post(`${BASE_URL}token/refresh/`, {
    refresh: refreshToken,
  });
  return response.data;
};
