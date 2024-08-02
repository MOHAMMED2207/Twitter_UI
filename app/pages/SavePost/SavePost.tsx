import Posts from "../../Components/coomon/Posts";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

const SavePost = () => {
  const { username }: any = useParams<{ tag: string; item: string }>();
  const scrollableDivSavePagesRef = useRef<HTMLDivElement | null>(null);
  const [feedType, setFeedType] = useState("SavePost");

  return (
    <div className="relative flex-[4_4_0] mr-auto border-r pb-[60px] lg:pb-0 md:pb-0 border-gray-700">
    <div
      ref={scrollableDivSavePagesRef}
      className="relative flex-[4_4_0] mr-auto border-r border-gray-700 overflow-y-auto"
    >
      <Posts
        feedType={feedType}
        scrollableDivSavePagesRef={scrollableDivSavePagesRef}
        username={username}
      />
    </div>
    </div>
  );
};

export default SavePost;
