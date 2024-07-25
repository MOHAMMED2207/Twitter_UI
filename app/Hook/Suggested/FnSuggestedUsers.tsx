import { useQuery } from "@tanstack/react-query";

export const FnSuggestedUsers = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(
          "https://twitter-backend-mauve.vercel.app/api/user/suggested",

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
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });
  return { suggestedUsers, isLoading };
};
