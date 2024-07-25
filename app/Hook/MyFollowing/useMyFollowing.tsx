import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useMyFollowing = ({ type }: any) => {
  const { username }: any = useParams<{ tag: string; item: string }>();

  const { data: GetMyFollowing, isLoading } = useQuery({
    queryKey: ["GetMyFollowing"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/user/${type}/${username}`,
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

  return { GetMyFollowing, isLoading };
};
