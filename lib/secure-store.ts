import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export type DecodedToken = {
  id: string;
  name?: string;
  email: string;
  photo?: {
    url: string;
    publicId: string;
  } | null;
  iat: number;
  exp: number;
};

export const saveAccessToken = async (token: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const deleteAccessToken = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
};

export const getDecodedAccessToken = async (): Promise<DecodedToken | null> => {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode access token:", error);
    return null;
  }
};
