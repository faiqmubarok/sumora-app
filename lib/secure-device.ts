import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "device_id";

export const saveDeviceId = async (deviceId: string) => {
  await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
};

export const getDeviceId = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(DEVICE_ID_KEY);
};

export const deleteDeviceId = async () => {
  await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
};
