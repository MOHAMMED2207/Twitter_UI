import { useQuery } from "@tanstack/react-query";

export const FnUpdatedPost = (ID: any) => {
  const { data: updatedPost, refetch } = useQuery({
    queryKey: ["post", ID],
    queryFn: async () => {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`http://localhost:5005/api/posts/${ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      return data;
    },
    refetchInterval: 5000, // جلب البيانات كل 10 ثواني
  });

  return { updatedPost };
};
