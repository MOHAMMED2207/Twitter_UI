"use client";

import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login/page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get("Succes");
  //   console.log(token);

  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = Cookies.get("Succes");

  //   if (token) {
  //     router.push("/pages/Home");
  //   } else {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, router]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default Page;
