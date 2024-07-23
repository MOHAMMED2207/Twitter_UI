import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const LogoutAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          "https://twitter-backend-mauve.vercel.app/api/auth/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          router.push("/"); // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        } else {
          console.error("Logout failed:", data.Message);
        }
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      Cookies.remove("Succes");
      toast.success("Logout successfully");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { logout };
};
