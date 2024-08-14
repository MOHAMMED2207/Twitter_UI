/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import XSvg from "../../../Svg/XSvg";
import { MdOutlineMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import Link from "next/link";
import { HashLoader } from "react-spinners";

import { LoginAuth } from "../../../Hook/Auth/LoginAuth";
import GoogleLoginButton from "../../../Components/GoogleLoginButton";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Password: "123123Test",
    email: "Tester@Gmail.com",
  });

  const { mutate, isError, isPending, error } = LoginAuth({ setFormData });

  const handleSubmit = (e: any) => {
    e.preventDefault(); // page won't reload
    mutate(formData);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col h-screen px-4 sm:px-10">
      <div className="flex flex-col lg:flex-row h-full px-4 sm:px-10">
        <div className="flex-1 hidden lg:flex items-center justify-center">
          <XSvg className="lg:w-2/3 fill-white" />
        </div>
        <div className=" flex flex-col justify-center items-center">
          <form
            className=" w-full  lg:w-full mx-auto sm:mx-20 flex gap-4 flex-col"
            onSubmit={handleSubmit}
            method="POST"
          >
            <XSvg className="w-24 lg:hidden fill-white" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ">
              Happening now
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Join today.
            </h1>
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdOutlineMail size={22} />
              <input
                type="email"
                className="grow border-b-2 border-[#525151] bg-[#ffffff09] text-white rounded-md p-2 outline-none"
                placeholder="Please enter your email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>

            <label className="relative input input-bordered rounded flex items-center gap-2">
              <MdPassword size={22} />
              <input
                type={showPassword ? "text" : "password"}
                className="grow border-b-2 border-[#525151] bg-[#ffffff09] text-white rounded-md p-2 outline-none"
                placeholder="Please enter your password"
                name="Password"
                onChange={handleInputChange}
                value={formData.Password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 focus:outline-none"
              >
                {showPassword ? (
                  <MdVisibilityOff size={22} color="white" />
                ) : (
                  <MdVisibility size={22} color="white" />
                )}
              </button>
            </label>
            <div className="flex w-full   flex-col gap-2 items-center justify-center ">
              <GoogleLoginButton />

              <div className="flex justify-center w-full lg:w-2/3 items-center">
                <span className="bg-[#565555] w-full h-[1px]"></span>
                <span className="px-2">or</span>
                <span className="bg-[#565555] w-full h-[1px]"></span>
              </div>

              <button
                className="relative flex
                w-full lg:w-3/4   
              rounded-3xl py-1 hover:transition-all ease-in-out 0 
               items-center justify-center overflow-hidden bg-black border-2 border-[#1d9bf0] text-white shadow-2xl hover:border-black  transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#1d9bf0] before:duration-500 before:ease-out hover:shadow-[#1d9bf0] hover:before:h-56 hover:before:w-full"
              >
                {isPending ? (
                  <div className=" w-full lg:w-3/4 h-6 relative  flex justify-center items-center ">
                    <HashLoader
                      color="#1d9bf0"
                      className="w-full absolute items-center "
                      size={190}
                    />
                    <span className="absolute z-10">Waiting... </span>
                  </div>
                ) : (
                  <span className="font-bold relative z-10">Login</span>
                )}
              </button>
            </div>

            {isError && (
              <div className="flex items-center justify-center w-full">
                {isError && <p className="text-red-500">{error?.message}</p>}
              </div>
            )}
          </form>
          <div className="flex w-full lg:w-3/4 flex-col  gap-2 mt-4">
            <div className="flex items-center justify-center w-full">
              <p className="text-white font-bold m-auto text-lg flex text-center">
                Don't Have An Account ?
              </p>
            </div>

            <Link
              href="/pages/Auth/Singup"
              className=" max-w-screen-2xl border-0  bg-[#1d9bf0] rounded-full flex items-center justify-center px-4 py-2"
            >
              <div className="text-white text-center font-bold flex items-center justify-center">
                <span className="overflow-clip whitespace-nowrap">
                  Create Account
                </span>
              </div>
            </Link>
            <div>
              <h1 className="text-sm font-medium text-gray-500">
                By signing up, you agree to the
                <span className="px-1 text-blue-500">Terms of Service</span>
                and
                <span className="px-1 text-blue-500">Privacy Policy</span>,
                including Cookie Use.
                <span className="px-1 text-blue-500">Cookie Use.</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-center space-x-2 text-sm py-4">
        <a href="#" className="text-gray-400">
          About
        </a>
        <a href="#" className="text-gray-400">
          Download the X app
        </a>
        <a href="#" className="text-gray-400">
          Help Center
        </a>
        <a href="#" className="text-gray-400">
          Terms of Service
        </a>
        <a href="#" className="text-gray-400">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-400">
          Cookie Policy
        </a>
        <a href="#" className="text-gray-400">
          Accessibility
        </a>
        <a href="#" className="text-gray-400">
          Ads info
        </a>
        <a href="#" className="text-gray-400">
          Blog
        </a>
        <a href="#" className="text-gray-400">
          Careers
        </a>
        <a href="#" className="text-gray-400">
          Brand Resources
        </a>
        <a href="#" className="text-gray-400">
          Advertising
        </a>
        <a href="#" className="text-gray-400">
          Marketing
        </a>
        <a href="#" className="text-gray-400">
          X for Business
        </a>
        <a href="#" className="text-gray-400">
          Developers
        </a>
        <a href="#" className="text-gray-400">
          Directory
        </a>
        <a href="#" className="text-gray-400">
          Settings
        </a>
      </div>
    </div>
  );
};
export default SignInPage;
