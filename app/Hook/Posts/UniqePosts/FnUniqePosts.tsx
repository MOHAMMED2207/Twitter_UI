import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const FnUniqePosts = ({ setPost, id }: any) => {
  const router = useRouter();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["Pk_Posts"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`https://twitter-backend-mauve.vercel.app/api/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Post not found");
        }

        if (!res) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (error: any) {
        console.error("Error fetching post:", error);
        router.back;
      }
    },
  });
  useEffect(() => {
    refetch();
  }, [id]);

  return {
    isLoading,
    refetch,
    isRefetching,
  };
};
