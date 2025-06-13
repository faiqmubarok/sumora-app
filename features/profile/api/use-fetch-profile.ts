import { axiosInstance } from "@/lib/axios";
import { Profile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

interface UseFetchProfile {
  id: string;
  onError?: (e: Error) => void;
}

export const useFetchProfile = ({ id, onError }: UseFetchProfile) => {
  return useQuery({
    queryKey: [id, "profile"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<{ user: Profile }>(
          `/users/${id}`
        );
        return data.user;
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        }
        console.error(error);
        return null;
      }
    },
    enabled: !!id,
  });
};
