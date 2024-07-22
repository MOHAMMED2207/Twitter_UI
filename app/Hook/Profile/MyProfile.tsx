import { useQuery } from "@tanstack/react-query";

export const MyProfile = ({ username }: any) => {
  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/user/profile/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });

  return { user, isLoading, refetch, isRefetching, error };
};
