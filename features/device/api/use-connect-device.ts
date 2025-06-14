import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type UseConnectDevice = {
  onSuccess?: (data: ConnectResponse) => void;
  onError?: (e: Error) => void;
};

type ConnectResponse = {
  message: string;
  data: {
    id: string;
    userId: string;
    name: string;
    qrcode: string;
  };
};

export const useConnectDevice = ({ onError, onSuccess }: UseConnectDevice) => {
  return useMutation({
    mutationFn: async (data: string): Promise<ConnectResponse> => {
      const { data: response } = await axiosInstance.put("/devices/connect", {
        deviceId: data,
      });

      return response;
    },
    onSuccess,
    onError,
  });
};
