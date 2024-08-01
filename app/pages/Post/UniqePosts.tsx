 import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ISPost from "../../Components/coomon/ISPost";
import PostSkeleton from "../../Components/skeletons/PostSkeleton";
import { FaArrowLeft } from "react-icons/fa";
import { UserObject_Type } from "../../Types/type";
import Image from "next/image";
import Link from "next/link";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { FnCommentProcess } from "../../Hook/Posts/Comment/FnCommentProcess";
import { useAuth } from "../../lib/Provider";
import { CiImageOn } from "react-icons/ci";
import { BiVideo } from "react-icons/bi";
import LoadingSpinner from "../../Components/coomon/LoadingSpinner";
import { FnUniqePosts } from "../../Hook/Posts/UniqePosts/FnUniqePosts";
import { FnUpdatedPost } from "../../Hook/Posts/AutoUp/FnUpdate";
import { useQueryClient } from "@tanstack/react-query";
import AutoResizeTextarea from "../../Components/AutoResizeTextarea";

const UniquePost = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<UserObject_Type>();
  const ImgRef = useRef<any>(null);
  const VideoRef = useRef<any>(null);
  const [img, setImg] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [Disabld, setDisabld] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<string>("");

  // Function ============================================================================================
  const { updatedPost } = FnUpdatedPost(id);
  const { refetch, isLoading } = FnUniqePosts({ setPost, id });
  const { commentPost, isCommenting } = FnCommentProcess({
    post,
    authUser,
    setText,
    setImg,
    setVideo,
  });
  // Function ============================================================================================

  // useEffect ===========================================================================================
  useEffect(() => {
    if (updatedPost) {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["Pk_Posts"] });
    } else {
      router.back();
    }
  }, [updatedPost, queryClient, id]);
 
  useEffect(() => {
    !text && !img && !video ? setDisabld(true) : setDisabld(false);
  }, [text, img, video]);
  // useEffect ===========================================================================================

  // Handel Function Btn =================================================================================
  const handlePostComment = (e: any) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost({ text, img, video });
  };
  const handleMediaChange = (e: any, setMedia: Function) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMedia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Handel Function Btn =================================================================================

  return (
    <React.Fragment>
    <div className="relative flex-[4_4_0]  h-[calc(100vh-57px)] lg:h-screen md:h-screen  mr-auto border-r    overflow-auto border-gray-700 flex flex-col">
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      <button
        className="p-3 pl-7 hover:pl-3 transition-all"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>
      {post ? <ISPost post={post} /> : <p>Post not found</p>}
      <section
        id={`comments_modal${post?._id}`}
        className="w-full  backdrop-blur-sm  relative  p-0 pb-2 lg:pb-0 md:pb-0  mx-auto flex-grow flex flex-col"
      >
        <div className="overflow-y-auto flex-grow p-4 max-h-[39rem] pb-[12px] ">
          <h3 className="font-os text-lg font-bold">Comments</h3>
          {post?.comments.length === 0 ? (
            <p className="text-md mt-2 text-gray-400">
              No comments yet 🤔 Be the first one 😉
            </p>
          ) : (
            post?.comments.map((comment) => (
              <div key={comment._id} className="flex mt-4 ">
                <Link href={`/pages/Profile/${comment.user.username}`}>
                  <div className="avatar">
                    <div className="relative w-14 h-14 rounded-full">
                      <Image
                        fill
                        alt="Post Image"
                        className="h-80 object-contain rounded-full border border-gray-700"
                        src={
                          comment.user.ProfileImg ||
                          "/avatars/avatar-placeholder.png"
                        }
                      />
                    </div>
                  </div>
                </Link>
                <div className="ml-3 w-full bg-[#0c0c0c] rounded-md py-2 pl-2 ">
                  <Link href={`/pages/Profile/${comment.user.username}`}>
                    <div className="font-medium text-white">
                      {comment.user.fullname}
                    </div>
                    <div className="font-medium opacity-45 text-sm">
                      @{comment.user.username}
                    </div>
                  </Link>

 {comment.text&&(
             <div className="pb-2">
                      <AutoResizeTextarea text={comment.text} />
                  </div>
)}
                 


                  {comment.img && (
                    <div className="relative max-w-sm min-h-48 max-h-72 overflow-hidden">
                      <Image
                        fill
                        alt="Image"
                        src={comment.img}
                        onClick={() => setIsModalOpen(comment.img)}
                        className="object-contain  w-full rounded-lg border border-gray-700"
                      />
                    </div>
                  )}
                  {comment.video && (
                    <div className="relative overflow-hidden">
                      <video
                        controls
                        className="w-full  h-60 object-contain rounded-lg border border-gray-700"
                      >
                        <source src={comment.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <form
          className="bg-black p-4  border-t border-gray-700 flex-shrink-0"
          onSubmit={handlePostComment}
        >
          {img && (
            <div className="relative w-36 h-36 mx-auto">
              <IoCloseSharp
                className="absolute  z-10 top-0 right-0 text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
                onClick={() => {
                  setImg(null);
                  ImgRef.current.value = null;
                }}
              />
              <Image
                src={img}
                fill
                alt="img create post"
                className="mx-auto object-cover rounded"
              />
            </div>
          )}
          {video && (
            <div className="relative w-full h-60 mx-auto">
              <IoCloseSharp
                className="absolute z-10 top-0 right-0 text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
                onClick={() => {
                  setVideo(null);
                  VideoRef.current.value = null;
                }}
              />
              <video
                controls
                className="mx-auto object-contain rounded w-full h-full"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
          <div className="flex flex-row justify-between">
            <div>
              <div className="flex gap-1 mt-2 items-center">
                <CiImageOn
                  className="fill-primary w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setVideo(null);
                    ImgRef.current.click();
                  }}
                />
                <BiVideo
                  className="fill-primary w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setImg(null);
                    VideoRef.current.click();
                  }}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={ImgRef}
                onChange={(e) => handleMediaChange(e, setImg)}
              />
              <input
                type="file"
                accept="video/*"
                hidden
                ref={VideoRef}
                onChange={(e) => handleMediaChange(e, setVideo)}
              />
            </div>
            <div className="flex-grow mx-3 flex items-center justify-between">
              <input
                type="text"
                className="w-full h-10 p-2 bg-[#0c0c0c] rounded-3xl text-white outline-none"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="w-10 h-10">
              {isCommenting ? (
                <div className="w-full h-full flex items-center justify-center ">
                  <LoadingSpinner />
                </div>
              ) : (
                <button
                  className={`w-full h-full bg-primary rounded-full text-white flex items-center justify-center ${
                    Disabld ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={Disabld}
                >
                  <IoSend size={20} />
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
           
            <Image
              onClick={() => setIsModalOpen("")}
              fill
              alt="Image"
              src={isModalOpen}
              className="object-contain"
            />
          </div>
        </div>
      )}




    </React.Fragment>
  );
};

export default UniquePost;
