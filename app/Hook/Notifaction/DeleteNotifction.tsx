import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const DeleteNotifction = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch("http://localhost:5005/api/notifications", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return { deleteNotifications };
};
