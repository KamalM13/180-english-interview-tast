import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { User } from "@/types/user";

export function useProfile() {
  const queryClient = useQueryClient();

  // Fetch profile data
  const profileQuery = useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/user/me");
      return response.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<User>) => {
      const response = await api.put("/user/details", updatedProfile);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}
