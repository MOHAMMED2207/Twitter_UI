import ISPost from "./ISPost";
import PostSkeleton from "../skeletons/PostSkeleton";
import { GetAllPosts } from "../../Hook/Posts/GetPostesAllFeedTypes/GetAllPosts";
import { UserObject_Type } from "../../Types/type";

const Posts = ({ feedType, username, userId }: any) => {
  const { posts, isLoading, isRefetching } = GetAllPosts({
    feedType,
    username,
    userId,
  });

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts?.map((post: UserObject_Type) => (
            <ISPost key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
