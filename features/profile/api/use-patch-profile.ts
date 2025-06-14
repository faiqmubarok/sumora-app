import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { EditFormSchema } from "../form/form";

type UsePatchProfile = {
  onSuccess?: () => void;
  onError?: (e: Error) => void;
};

export const usePatchProfile = ({ onError, onSuccess }: UsePatchProfile) => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditFormSchema }) => {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof EditFormSchema];

        if (key === "photo" && value && typeof value === "object") {
          const { uri, name, type } = value;

          if (uri && name && type) {
            // Pastikan type lengkap, misalnya image/jpeg
            const correctedType = type === "image" ? "image/jpeg" : type;
            formData.append("photo", {
              uri,
              type: correctedType,
              name,
            } as any);
          }
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      }

      const response = await axiosInstance.patch(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess,
    onError,
  });
};

