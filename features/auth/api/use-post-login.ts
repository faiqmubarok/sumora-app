import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormSchema } from "../form/form";

type LoginResponse = {
  token: string;
  message: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    devices: {
      id: string;
      name: string;
    }[];
  };
};

type UsePostLoginProps = {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (e: AxiosError) => void;
};

export const usePostLogin = ({ onError, onSuccess }: UsePostLoginProps) => {
  return useMutation({
    mutationFn: async (data: LoginFormSchema): Promise<LoginResponse> => {
      const { data: response } = await axiosInstance.post(
        "/users/auth/login",
        data
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
