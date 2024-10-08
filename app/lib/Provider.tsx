// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface AuthContextProps {
  authUser: any;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch("https://twitter-backend-mauve.vercel.app/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (
      pathname === "/pages/Home" ||
      pathname === "/pages/Notifications" ||
      pathname.includes(`/pages/Profile/${authUser?.username}`)
    ) {
      if (!token) router.push("/");
    }
  }, [pathname, isAuthenticated, authUser?.username, children, router]);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
