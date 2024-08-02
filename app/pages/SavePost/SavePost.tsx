import { useAuth } from "../../lib/Provider";
import Posts from "../../Components/coomon/Posts";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { formatNumber } from "../../util/Date";

const SavePost = () => {
  const { username }: any = useParams<{ tag: string; item: string }>();
  const scrollableDivSavePagesRef = useRef<HTMLDivElement | null>(null);
  const [feedType, setFeedType] = useState("SavePost");
  const { authUser } = useAuth();
  const router = useRouter();

  return (
    <div className="relative flex-[4_4_0] mr-auto border-r pb-[60px] lg:pb-0 md:pb-0 border-gray-700">
      <div
        ref={scrollableDivSavePagesRef}
        className="relative flex-[4_4_0] mr-auto border-r border-gray-700 overflow-y-auto"
      >
        <div className="flex gap-10 px-4 py-2 items-center">
          <button
            className=" pl-2 transition-all"
            onClick={() => router.back()}
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <p className="font-bold text-lg">Save Post</p>
            <span className="text-sm text-slate-500">
              {formatNumber(authUser?.savedPosts.length)} Posts
            </span>
          </div>
        </div>
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
