import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const GetAllPosts = ({ feedType, username, userId, page }: any) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return `https://twitter-backend-mauve.vercel.app/api/post/all?page=${page}&limit=10`;
      case "following":
        return `https://twitter-backend-mauve.vercel.app/api/post/following?page=${page}&limit=10`;
      case "post":
        return `https://twitter-backend-mauve.vercel.app/api/post/user/${username}?page=${page}&limit=10`;
      case "SavePost":
        return `https://twitter-backend-mauve.vercel.app/api/post/Save/${username}?page=${page}&limit=10`;
      case "likes":
        return `https://twitter-backend-mauve.vercel.app/api/post/likes/${username}?page=${page}&limit=10`;
      default:
        return `https://twitter-backend-mauve.vercel.app/api/post/all?page=${page}&limit=10`;
    }
  };
  const POST_ENDPOINT = getPostEndpoint();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["posts", feedType, username, userId, page],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch(POST_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  }, [feedType, refetch, username, page]);
  return {
    posts: data?.posts,
    totalPosts: data?.totalPosts,
    isLoading,
    refetch,
    isRefetching,
  };
};
