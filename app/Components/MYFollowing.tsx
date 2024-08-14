import React, { useState } from "react";
import { useMyFollowing } from "../Hook/MyFollowing/useMyFollowing";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import RightPanelSkeleton from "./skeletons/RightPanelSkeleton";

const MyFollowing = ({ type }: any) => {
  const { GetMyFollowing, isLoading } = useMyFollowing({ type });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = GetMyFollowing?.following
    ? GetMyFollowing?.following?.filter(
        (user: any) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : GetMyFollowing?.followers?.filter(
        (user: any) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="absolute rounded-lg z-[999999] p-4 bg-[#16181c]">
      <form className="relative border-b-2 border-[#2d2d2d] pb-2 flex justify-between items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`${type} Search...`}
          className="border-none outline-none rounded-full pl-4 text-black p-2 flex-grow"
        />
        <button
          type="button"
          className="absolute right-0 border-2 w-10 h-10 flex justify-center items-center rounded-full bg-[#16181C] text-white"
        >
          <FaSearch />
        </button>
      </form>
      <div className="overflow-auto max-h-56 w-full">
        {isLoading && <RightPanelSkeleton />}
        {!isLoading && filteredUsers.length === 0 && (
          <div className="text-white text-center mt-4">
            No one is following you or you are not following anyone.
          </div>
        )}
        {!isLoading &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user: any) => (
            <Link
              href={`/pages/Profile/${user.username}`}
              className="flex items-center py-2 border-b-2 border-[#2d2d2d] justify-between gap-4 mb-2"
              key={user._id}
            >
              <div className="flex gap-2 items-center">
                <div className="avatar">
                  <div className="relative w-14 h-14 overflow-hidden rounded-full">
                    <Image
                      fill
                      alt="Profile Image"
                      className="object-contain"
                      src={user.ProfileImg || "/avatars/avatar-placeholder.png"}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight truncate w-32">
                    {user.fullname}
                  </span>
                  <span className="text-sm text-slate-500 truncate w-32">
                    @{user.username}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MyFollowing;