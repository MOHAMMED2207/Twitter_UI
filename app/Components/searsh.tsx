import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FollowButton } from "../Hook/Follow/FollowButton";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (searchTerm.length > 0 && searchTerm) {
      fetch(`http://localhost:5005/api/searchUsers/${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const { data: authUser } = useQuery<any>({ queryKey: ["authUser"] });

  return (
    <div className=" sticky top-4 search-bar mb-2 bg-[#16181C] rounded-lg pb-0.5">
      <form
        // onSubmit={handleSearch}
        className="relative flex justify-between items-center gap-2"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users..."
          className="border-none outline-none rounded-full pl-4 text-black p-2 flex-grow"
        />
        <button
          type="button"
          className="absolute right-0  border-2 w-10 h-10 flex justify-center items-center  rounded-full bg-[#16181C] text-white"
        >
          <FaSearch />
        </button>
      </form>

      <div className="search-results px-2 ">
        {searchResults?.map((user: any) => (
          <Link
            href={`/pages/Profile/${user.username}`}
            className="flex   
            my-4  pb-2 border-b-2 border-[#2e3035] 
            
            items-center justify-between gap-4"
            key={user._id}
          >
            <div className="flex gap-2 items-center">
              <div className="avatar">
                <div className="relative w-14 h-14 overflow-hidden rounded-full">
                  <Image
                    fill
                    alt=" Image"
                    className="object-contain"
                    src={user.ProfileImg || "/avatars/avatar-placeholder.png"}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold tracking-tight truncate w-28">
                  {user.fullname}
                </span>
                <span className="text-sm text-slate-500 truncate w-28">
                  @{user.username}
                </span>
              </div>
            </div>
            <div>
              {authUser?._id !== user?._id && (
                <FollowButton userId={user._id} username={user.username} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
