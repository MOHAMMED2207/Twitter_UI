"use client";

import { FormDataUpdateProfile } from "../../Types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData: FormDataUpdateProfile) => {
        try {
          const token = localStorage.getItem("jwt");

          const res = await fetch(`http://localhost:5005/api/user/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,

            },
            credentials: "include",
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          console.log(data);

          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          return data;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
      onSuccess: (data) => {
        toast.success("Profile updated successfully");
        setIsSuccess(true);
        const oldUsername = queryClient.getQueryData<any>([
          "authUser",
        ])?.username;
        const newUsername = data?.username;

        if (newUsername && newUsername !== oldUsername) {
          router.push(`/pages/Profile/${newUsername}`);
        }

        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateProfile, isUpdatingProfile, isSuccess };
};
