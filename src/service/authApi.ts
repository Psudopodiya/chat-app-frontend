import axios from "axios";

// Replace with your backend URL
const BASE_URL = "http://127.0.0.1:8000/api/";

// API call for login
export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}token/`, credentials);
  return response.data; // Expected to return access and refresh tokens
};

// API call for registration
export const registerUser = async (userData: { username: string; password: string, email: string }) => {
  const response = await axios.post(`${BASE_URL}users/register/`, userData);
  return response.data; // Handle the response as needed
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refreshToken });
  return response.data; // Expected to return access token
};