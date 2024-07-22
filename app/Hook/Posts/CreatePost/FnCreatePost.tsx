import { InCoded, UserData } from "../../../Types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const FnCreatePost = ({ setText, setImg, setVideo }: any) => {
  const { data: authUser } = useQuery<UserData>({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img, video }: InCoded) => {
      try {
        const res = await fetch("https://twitter-backend-mauve.vercel.app/api/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({ text, img, video }), // إضافة الفيديو إلى الجسم
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      setText("");
      setImg(null);
      setVideo(null); // إعادة تعيين حالة الفيديو
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return { createPost, isPending, isError, error, authUser };
};
