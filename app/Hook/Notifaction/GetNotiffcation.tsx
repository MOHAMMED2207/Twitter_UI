import { useQuery } from "@tanstack/react-query";
import { useFetchNotifications } from "./useFetchNotifications";

export const GetNotiffcation = () => {
  const { readNotifications } = useFetchNotifications();
  const {
    data: notifications,
    isLoading,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch("https://twitter-backend-mauve.vercel.app/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data) {
          readNotifications();
        }
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  return { notifications, isLoading, isRefetching, error };
};
