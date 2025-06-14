import { create } from "zustand";

type DeviceStore = {
  isConnected: boolean;
  deviceId: string | null;
  setDeviceId: (id: string) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
};

export const useDeviceStore = create<DeviceStore>((set) => ({
  isConnected: false,
  deviceId: null,
  setDeviceId: (id) => set({ deviceId: id }),
  setConnected: (connected) => set({ isConnected: connected }),
  reset: () => set({ isConnected: false, deviceId: null }),
}));
