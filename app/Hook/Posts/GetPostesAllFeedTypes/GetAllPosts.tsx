import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const GetAllPosts = ({ feedType, username, userId }: any) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return " https://twitter-backend-mauve.vercel.app/api/post/all";
      case "following":
        return " https://twitter-backend-mauve.vercel.app/api/post/following";
      case "post":
        return ` https://twitter-backend-mauve.vercel.app/api/post/user/${username}`;
      case "likes":
        return ` https://twitter-backend-mauve.vercel.app/api/post/likes/${userId}`;
      default:
        return " https://twitter-backend-mauve.vercel.app/api/post/all";
    }
  };
  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    refetchInterval: 3600000, // 1 hour
  });
  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  return { posts, isLoading, refetch, isRefetching };
};
