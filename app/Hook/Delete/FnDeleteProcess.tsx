import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const FnDeleteProcess = ({ post }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();

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
      if (pathname === `/pages/Post/${id}`) router.back();
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    deletePost,
    isDeleting,
  };
};

