"use client";
import XSvg from "../../Svg/XSvg";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutAuth } from "../../Hook/Auth/LogoutAuth";
import { useEffect, useState } from "react";
import { IUsers } from "../../Types/type";
import { useFetchNotifications } from "../../Hook/Notifaction/useFetchNotifications";

const Sidebar = () => {
  const { data: authUser } = useQuery<IUsers>({ queryKey: ["authUser"] });
  const { logout } = LogoutAuth();

  const { prevUnreadCount } = useFetchNotifications();
  const [Active, setActive] = useState("Home");
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/pages/Notifications" ||
      pathname.startsWith("/pages/Notifications/")
    ) {
      setActive("Notifications");
    } else if (pathname === `/pages/Profile/${authUser?.username}`) {
      setActive("Profile");
    } else if (pathname === "/pages/Seerch") {
      setActive("Seerch");
    } else {
      setActive("Home");
    }
  }, [authUser?.username, pathname]); // يتم تشغيل useEffect فقط عند تغير pathname

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className=" hidden lg:flex md:flex    justify-between sticky top-0 left-0 h-screen  flex-col border-r border-gray-700 w-20 md:w-full">
        <div>
          <Link
            href="/pages/Home"
            className="flex justify-center md:justify-start"
          >
            <XSvg className="px-2 w-12 h-12 rounded-full fill-white  hover:bg-[#16181c]" />
          </Link>
          <ul className="flex flex-col gap-3 mt-4">
            <li className="flex justify-center md:justify-start">
              <Link
                href="/pages/Home"
                className={`flex gap-3 items-center hover:bg-[#16181c] ${
                  Active === "Home" ? "bg-[#16181c]" : ""
                } transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer`}
              >
                <MdHomeFilled className="w-8 h-8" />
                <span className="text-lg hidden md:block">Home</span>
              </Link>
            </li>
            <li className="flex justify-center md:justify-start relative">
              <Link
                href={"/pages/Notifications"}
                className={`flex gap-3 items-center hover:bg-[#16181c] ${
                  Active === "Notifications" || Active === "showNot"
                    ? "bg-[#16181c]"
                    : ""
                } 
    ${prevUnreadCount > 0 ? "bg-[#16181c] " : ""}
     transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer`}
              >
                <div className="relative">
                  <IoNotifications className="w-6 h-6" />
                  {prevUnreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0 text-xs">
                      {prevUnreadCount}
                    </span>
                  )}
                </div>
                <span className="text-lg hidden md:block">Notifications</span>
              </Link>
            </li>

            <li className="flex justify-center md:justify-start">
              <Link
                href={`/pages/Profile/${authUser?.username}`}
                className={`flex gap-3 items-center  hover:bg-[#16181c] ${
                  Active === "Profile" ? "bg-[#16181c]" : ""
                }
              } transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer`}
              >
                <FaUser className="w-6 h-6" />
                <span className="text-lg hidden md:block">Profile</span>
              </Link>
            </li>

            <li>
              <Link
                href={`/pages/Seerch`}
                className={`flex gap-3 items-center  hover:bg-[#16181c] ${
                  Active === "Seerch" ? "bg-[#16181c]" : ""
                }
              } transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer`}
              >
                <FaUsers className="w-7 h-7" />
                <span className="text-lg hidden md:block">Frinds</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="">
          {authUser && (
            <Link
              href={`/pages/Profile/${authUser.username}`}
              className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300  hover:bg-[#16181c] py-2 pl-2  pr-4 rounded-full"
            >
              <div className="avatar hidden md:inline-flex">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    fill
                    src={authUser?.ProfileImg || "/avatars/boy2.png"}
                    alt="Profile Image"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex  justify-between   ">
                <div className="hidden md:block">
                  <div className="flex w-full justify-between">
                    <p className="text-white flex justify-between font-bold text-sm w-[122px] truncate">
                      {authUser?.fullname}
                    </p>
                    <BiLogOut
                      className="w-6 h-5  cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    />
                  </div>

                  <p className="text-slate-500 text-sm truncate w-28">
                    @{authUser?.username}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* شريط التنقل السفلي للأجهزة المحمولة */}
      <div className=" z-[99999999999999999] md:hidden lg:hidden items-center justify-center fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700">
        <div className="flex justify-around items-center py-2">
          <Link href="/pages/Home" className="flex  flex-col items-center">
            <MdHomeFilled
              className={`w-8 h-8 ${
                Active === "Home" ? "text-blue-500" : "text-white"
              }`}
            />
            <span className="text-xs text-white">Home</span>
          </Link>
          <Link
            href="/pages/Notifications"
            className="flex flex-col items-center relative"
          >
            <IoNotifications
              className={`w-8 h-8 ${
                Active === "Notifications" ? "text-blue-500" : "text-white"
              }`}
            />
            {prevUnreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0 text-xs">
                {prevUnreadCount}
              </span>
            )}
            <span className="text-xs text-white">Notifications</span>
          </Link>
          <Link
            href={`/pages/Profile/${authUser?.username}`}
            className="flex flex-col items-center"
          >
            <FaUser
              className={`w-7 h-7  ${
                Active === "Profile" ? "text-blue-500" : "text-white"
              }`}
            />
            <span className="text-xs text-white">Profile</span>
          </Link>

          <Link href={`/pages/Seerch`} className="flex flex-col items-center">
            <FaUsers
              className={`w-8 h-7  ${
                Active === "Seerch" ? "text-blue-500" : "text-white"
              }`}
            />
            <span className="text-xs text-white">Frinds</span>
          </Link>

          <div className="flex flex-col items-center justify-center">
            <BiLogOut
              className="w-7 h-7 mr-1  text-white cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            />
            <span className="text-xs text-white">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
