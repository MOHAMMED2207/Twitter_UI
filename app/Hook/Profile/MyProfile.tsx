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
        const token = localStorage.getItem("jwt");

        const res = await fetch(
          `http://localhost:5005/api/user/profile/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,

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
