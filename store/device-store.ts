import { create } from "zustand";

type DeviceStore = {
  isConnected: boolean;
  setConnected: (connected: boolean) => void;
  reset: () => void;
};

export const useDeviceStore = create<DeviceStore>((set) => ({
  isConnected: false,
  setConnected: (connected) => set({ isConnected: connected }),
  reset: () => set({ isConnected: false }),
}));
