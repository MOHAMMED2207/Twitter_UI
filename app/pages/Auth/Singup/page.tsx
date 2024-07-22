"use client";
import { useState } from "react";
import XSvg from "../../../Svg/XSvg";
import { MdOutlineMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import { RigsterAuth } from "../../../Hook/Auth/RigsterAuth";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    Phone: "",
    email: "",
    Password: "",
  });

  const { mutate, isError, isPending, error } = RigsterAuth({ setFormData });

  const handleSubmit = (e: any) => {
    e.preventDefault(); // page won't reload
    mutate(formData);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="w-full md:w-4/5 lg:w-full  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
          method="POST"
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail size={22} />
            <input
              type="email"
              className="grow text-black  rounded-md p-2 outline-none"
              placeholder="Please enter your email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <FaUser size={22} />
            <input
              type="text"
              className="grow text-black  rounded-md p-2 outline-none"
              placeholder="Please enter your fullName"
              name="fullname"
              onChange={handleInputChange}
              value={formData.fullname}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser size={22} />
              <input
                type="text"
                className="grow text-black  rounded-md p-2 outline-none"
                placeholder="Please enter your username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline size={22} />
              <input
                type="text"
                className="grow text-black  rounded-md p-2 outline-none"
                placeholder="Please enter your phone"
                name="Phone"
                onChange={handleInputChange}
                value={formData.Phone}
              />
            </label>
          </div>
          <label className="relative input input-bordered rounded flex items-center gap-2">
            <MdPassword size={22} />
            <input
              type={showPassword ? "text" : "password"}
              className="grow text-black  rounded-md p-2 outline-none"
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
                <MdVisibilityOff size={22} color="black" />
              ) : (
                <MdVisibility size={22} color="black" />
              )}
            </button>
          </label>
          <div className="flex items-center justify-center w-full">
            <button
              className="relative flex
              rounded-3xl btn-primary  hover:transition-all ease-in-out 0 w-3/4 py-1  items-center justify-center overflow-hidden bg-black border-2 border-[#1d9bf0] text-white shadow-2xl hover:border-black  transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#1d9bf0] before:duration-500 before:ease-out hover:shadow-[#1d9bf0] hover:before:h-56 hover:before:w-full"
            >
              {isPending ? (
                <div className=" w-3/4 h-6 relative flex justify-center items-center ">
                  <HashLoader
                    color="#1d9bf0"
                    className="w-full absolute items-center "
                    size={190}
                  />
                  <span className="absolute z-10">Waiting... </span>
                </div>
              ) : (
                <span className="font-bold relative z-10"> Create Account</span>
              )}
            </button>
          </div>
          {isError && (
            <div className="flex items-center justify-center w-full">
              {isError && <p className="text-red-500">{error?.message}</p>}
            </div>
          )}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <div className="flex items-center justify-center w-full">
            <p className="text-white font-medium text-lg flex text-center">
              Already have an account?
            </p>
          </div>

          <Link
            href="/"
            className=" max-w-screen-2xl border-0  bg-[#1d9bf0] rounded-full flex items-center justify-center px-4 py-2"
          >
            <div className="text-white text-center font-bold flex items-center justify-center">
              <span className="overflow-clip whitespace-nowrap">Login</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
