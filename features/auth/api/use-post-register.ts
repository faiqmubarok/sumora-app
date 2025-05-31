import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { RegisterFormSchema } from "../form/form";

type UsePostRegisterProps = {
  onSuccess?: () => void;
  onError?: (e: Error) => void;
};

export const usePostRegister = ({
  onError,
  onSuccess,
}: UsePostRegisterProps) => {
  return useMutation({
    mutationFn: async (data: RegisterFormSchema) => {
      const { data: response } = await axiosInstance.post("/auth/register", {
        data,
      });
      return response;
    },
    onSuccess,
    onError,
  });
};
