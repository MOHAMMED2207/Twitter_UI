import { InCoded } from "../../../Types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const FnCommentProcess = ({ post, setText, setImg, setVideo }: any) => {
  const queryClient = useQueryClient();

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async ({ text, img, video }: InCoded) => {
      try {
        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/post/comment/${post._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ text, img, video }), // إضافة الفيديو إلى الجسم
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
    onSuccess: (updateComents) => {
      setText("");
      setImg(null);
      setVideo(null); // إعادة تعيين حالة الفيديو
      toast.success("Comment posted successfully");

      // queryClient.setQueryData(["posts"], (oldQueryData: any) => {
      //   return oldQueryData.map((X: any) => {
      //     if (X._id === post._id) {
      //       return { ...X, comments: updateComents };
      //     }
      //     return X;
      //   });
      // });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { commentPost, isCommenting };
};
