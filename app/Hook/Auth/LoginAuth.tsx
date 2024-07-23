import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type FormData = {
  email: String;
  Password: String;
};
export const LoginAuth = ({ setFormData }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, Password }: FormData) => {
      try {
        const res = await fetch("https://twitter-backend-mauve.vercel.app/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // هذا التأكيد على إرسال الكوكيز
          body: JSON.stringify({ email, Password }),
        });

        const data = await res.json();

        // if (!res.ok) throw new Error(data.error || "Failed to create account");
        console.log(data);
        console.log("is error" + error);
        return data;
      } catch (error) {
        console.log("is error" + error);
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Login successfully");
      router.push("/pages/Home");
      
      setFormData({
        email: "",
        Password: "",
      });

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      
    },
  });

  return { mutate, isError, isPending, error };
};
