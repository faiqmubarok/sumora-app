import { getDeviceId } from "@/lib/secure-device";
import { useDeviceStore } from "@/store/device-store";
import { useEffect } from "react";

export const useInitializeDeviceState = () => {
  useEffect(() => {
    const syncDevice = async () => {
      const id = await getDeviceId();
      if (id) {
        useDeviceStore.getState().setDeviceId(id);
        useDeviceStore.getState().setConnected(true);
      }
    };
    syncDevice();
  }, []);
};
