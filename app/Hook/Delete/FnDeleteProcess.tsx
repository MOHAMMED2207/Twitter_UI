import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const FnDeleteProcess = ({ post }: any) => {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/post/delete/${post._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,

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
    onSuccess: async () => {
      toast.success("Post deleted successfully");
      // حذف الإشعارات المرتبطة بالمنشور
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    deletePost,
    isDeleting,
  };
};
