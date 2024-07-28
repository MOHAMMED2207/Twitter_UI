import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ISPost from "./ISPost";
import PostSkeleton from "../skeletons/PostSkeleton";
import { GetAllPosts } from "../../Hook/Posts/GetPostesAllFeedTypes/GetAllPosts";
import { UserObject_Type } from "../../Types/type";
import LoadingSpinner from "./LoadingSpinner";

const Posts = ({
  feedType,
  username,
  userId,
  scrollableDivRef,
  scrollableDivRefProfile,
}: any) => {
  const [page, setPage] = useState(1);
  const { posts, totalPosts, isLoading, isRefetching } = GetAllPosts({
    feedType,
    username,
    userId,
    page,
  });

  const [allPosts, setAllPosts] = useState<UserObject_Type[]>([]);

  useEffect(() => {
    if (posts) {
      if (page === 1) {
        setAllPosts(posts);
      } else {
        setAllPosts((prevPosts) => [...prevPosts, ...posts]);
      }
    }
  }, [posts, page]);

  const fetchMoreData = () => {
    if (allPosts.length < totalPosts) {
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 1000); // تأخير لمدة ثانية واحدة
    }
  };

  const refrance = scrollableDivRefProfile || scrollableDivRef;
  useEffect(() => {
    console.log(refrance);
  }, [refrance]);

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchMoreData}
      hasMore={allPosts.length < totalPosts}
      loader={
        <div className="w-full flex justify-center items-center p-2">
          <LoadingSpinner />
        </div>
      }
      scrollableTarget={refrance}
      endMessage={
        <div className="w-full text-center p-2">
          <b className="font-bold">There are no more posts</b>
        </div>
      }
    >
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {allPosts.map((post: UserObject_Type) => (
        <ISPost key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default Posts;
