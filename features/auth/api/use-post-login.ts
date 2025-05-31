import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoginFormSchema } from "../form/form";

type UsePostLoginProps = {
  onSuccess?: () => void;
  onError?: (e: Error) => void;
};

export const usePostLogin = ({ onError, onSuccess }: UsePostLoginProps) => {
  return useMutation({
    mutationFn: async (data: LoginFormSchema) => {
      const { data: response } = await axiosInstance.post("/auth/login", {
        data,
      });
      return response;
    },
    onSuccess,
    onError,
  });
};
