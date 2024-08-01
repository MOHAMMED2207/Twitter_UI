import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const FnSavePost = ({ post }: any) => {
  const queryClient = useQueryClient();
  const { mutate: SavePost, isPending: isLSaveing } = useMutation({
    mutationFn: async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/post/Save/${post._id}`,
          {
            method: "POST",
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // طباعة الرسالة التي تعود من الـ API في toast
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  return { SavePost, isLSaveing };
};
