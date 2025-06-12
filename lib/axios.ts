import axios from "axios";
import { getAccessToken } from "./secure-store";

export const axiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/v1`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
