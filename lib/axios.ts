import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/v1`,
  withCredentials: true,
});
