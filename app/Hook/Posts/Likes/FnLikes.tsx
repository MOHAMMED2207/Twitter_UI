import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const FnLikeProcess = ({ post }: any) => {
  const queryClient = useQueryClient();
  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/post/like/${post._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: (updatedLikes) => {
      // instead, update the cache directly for that post
      queryClient.setQueryData(["posts"], (oldData: any) => {
        return oldData.map((p: any) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { likePost, isLiking };
};
