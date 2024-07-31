import { useQuery } from "@tanstack/react-query";
export const FnUpdatedPost = (ID: any) => {
  const {
    data: updatedPost,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["post", ID],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");
      const res = await fetch(`https://twitter-backend-mauve.vercel.app/api/posts/${ID}`, {
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
        const data = await res.json();
        return data;
      } catch (error: any) {
        console.log(error.message);
        return null;
      }
    },
    refetchInterval: 5000,
  });

  return { updatedPost, isError };
};

