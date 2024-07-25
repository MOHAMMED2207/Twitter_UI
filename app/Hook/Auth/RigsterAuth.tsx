import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormData } from "../../Types/type";

export const RigsterAuth = ({ setFormData }: any) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({
      fullname,
      email,
      username,
      Phone,
      Password,
    }: FormData) => {
      try {
        const res = await fetch("https://twitter-backend-mauve.vercel.app/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, username, Phone, Password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
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
      toast.success("Account created successfully");
      setFormData({
        fullname: "",
        username: "",
        Phone: "",
        email: "",
        Password: "",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { mutate, isError, isPending, error };
};
