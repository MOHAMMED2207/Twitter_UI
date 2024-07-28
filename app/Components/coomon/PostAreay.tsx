import React, { useState, useRef } from "react";
import Posts from "./Posts";
import CreatePost from "../../pages/Home/CreatePost";
import { IoIosCreate } from "react-icons/io";

export const PostAreay = () => {
  const [feedType, setFeedType] = useState("forYou");
  const createPostRef = useRef<any>(null);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const scrollToCreatePost = () => {
    if (createPostRef.current) {
      createPostRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex-[4_4_0] mr-auto border-r pb-[60px] lg:pb-0 md:pb-0 border-gray-700 ">
      <div
        ref={scrollableDivRef}
        className="relative flex-[4_4_0] mr-auto border-r  border-gray-700  "
      >
        {/* Header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            ref={createPostRef}
            className="relative flex justify-center flex-1 p-3 hover:bg-[#16181c] transition duration-300 cursor-pointer"
            onClick={() => setFeedType("forYou")}
          >
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-blue-500"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-[#16181c] transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("following")}
          >
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-blue-500"></div>
            )}
          </div>
        </div>

        {/* CREATE POST INPUT */}
        <div>
          <CreatePost />
        </div>

        {/* POSTS */}
        <Posts feedType={feedType} scrollableDivRef={scrollableDivRef} />
      </div>
      <div
        className="hover:bg-blue-800 transition-all fixed bottom-20 right-4 lg:right-8 lg:bottom-8 md:right-8 md:bottom-8 p-2 bg-blue-500 rounded-full cursor-pointer"
        onClick={scrollToCreatePost}
      >
        <IoIosCreate className="" size={30} />
      </div>
    </div>
  );
};
