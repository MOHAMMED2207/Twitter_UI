import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async ({
      userId,
      username,
    }: {
      userId: string;
      username: string;
    }) => {
      try {
        const res = await fetch(
          `https://twitter-backend-mauve.vercel.app/api/user/follow/${userId}`,
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
          throw new Error(data.error || "Something went wrong!");
        }

        return username;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: (username: string) => {
      toast.success(`You are now following ${username}`);

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile", username] }), // Invalidate the specific user profile query
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isPending };
};

export default useFollow;
