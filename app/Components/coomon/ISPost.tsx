import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegComment, FaHeart, FaBookmark } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../util/Date";
import { FnLikeProcess } from "../../Hook/Posts/Likes/FnLikes";
import { FnDeleteProcess } from "../../Hook/Delete/FnDeleteProcess";
import { ISPostProps } from "../../Types/type";
import { VscListSelection } from "react-icons/vsc";
import Link from "next/link";
import { useAuth } from "../../lib/Provider";
import { ConfirmModel } from "../ConfirmModel";
import AutoResizeTextarea from "../AutoResizeTextarea";
import { FnUpdatedPost } from "../../Hook/Posts/AutoUp/FnUpdate";
import { FnSavePost } from "../../Hook/Posts/SavePost/FnSavePost";

interface Comment {
  user: string;
  text: string;
  img?: string;
  video?: string;
}
const ISPost = ({ post }: ISPostProps) => {
  // Is all variabl and state and ref ==============================================================================
  // variabl
  const { authUser } = useAuth();
  const postOwner = post.user;
  const formattedDate = formatPostDate(post.createdAt);
  const isMyPost = post.user._id === authUser?._id;
  // state
  const [isModalOpen, setIsModalOpen] = useState<string>("");
  const [Conffirm, setConffirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState<Comment[]>([]); // إذا كنت تستخدم حالة للتعليقات

  const [isLiked, setIsLiked] = useState(
    Array.isArray(post.likes) && post.likes.includes(authUser?._id || "")
  );

  const [isLSave, setISave] = useState(
    Array.isArray(post.savedBy) && post.savedBy.includes(authUser?._id || "")
  );
  // Is all variabl and state and ref ==============================================================================

  // Start ALL Hoks ================================================================================================
  const { likePost, isLiking } = FnLikeProcess({ post });
  const { deletePost, isDeleting } = FnDeleteProcess({
    post,
  });
  const { updatedPost } = FnUpdatedPost(post._id);
  const { SavePost, isLSaveing } = FnSavePost({ post }); // استدعاء الدالة للحصول على SavePost

  // end ALL Hoks ==================================================================================================

  // start ALL handel faunction  ===================================================================================
  const handleDeletePost = () => {
    deletePost();
    setConffirm(false);
    setIsOpen(false);
  };

  const handleLikePost = async () => {
    likePost();
    if (isLiked) {
      setLikes((prevLikes) => prevLikes.filter((id) => id !== authUser?._id));
    } else {
      setLikes((prevLikes) => [...prevLikes, authUser?._id]);
    }
    setIsLiked(!isLiked);
  };

  const handleSavePost = () => {
    SavePost(); // استدعاء الدالة لحفظ المنشور
    setISave(
      Array.isArray(post.savedBy) && post.savedBy.includes(authUser?._id || "")
    );
  };
  // end ALL handel faunction  ===================================================================================

  // UseEffect ===================================================================================================
  useEffect(() => {
    if (updatedPost) {
      setLikes(updatedPost.likes || []);
      setIsLiked(
        Array.isArray(updatedPost.likes) &&
          updatedPost.likes.includes(authUser?._id || "")
      );
      // تحديث التعليقات بشكل مباشر إذا كانت الخصائص موجودة
      setComments(updatedPost.comments || []);
    }
  }, [updatedPost]);

  useEffect(() => {
    setISave(
      Array.isArray(post.savedBy) && post.savedBy.includes(authUser?._id || "")
    );
  }, [post.savedBy, authUser]);
  // UseEffect ===================================================================================================

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex  sm:flex-row gap-2 items-start p-4 border-y border-gray-700">
          <Link href={`/pages/Profile/${postOwner.username}`}>
            <div className="avatar">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  fill
                  alt="Post Image"
                  className="object-cover"
                  src={
                    postOwner.ProfileImg || "/avatars/avatar-placeholder.png"
                  }
                />
              </div>
            </div>
          </Link>

          <div className="flex flex-col flex-1">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col lg:flex-row md:flex-row  lg:gap-2 lg:items-center md:gap-2 md:items-center">
                <Link href={`/pages/Profile/${postOwner.username}`}>
                  <span className="font-bold text-base sm:text-lg">
                    {postOwner.fullname}
                  </span>
                </Link>
                <Link href={`/pages/Profile/${postOwner.username}`}>
                  <span className="text-gray-700 flex gap-1 text-xs sm:text-sm">
                    @{postOwner.username} · {formattedDate}
                  </span>
                </Link>
              </div>

              {isMyPost && (
                <span className="flex justify-end relative flex-1">
                  {!isDeleting && (
                    <VscListSelection
                      className="cursor-pointer hover:text-red-500 w-4 h-4 lg:w-6 lg:h-6"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  )}
                  {isOpen && (
                    <ul className="absolute w-max top-7 right-0 bg-black border-gray-700 border-2 hover:transition-all hover:border-black hover:bg-red-600 rounded-lg z-10 p-2 shadow">
                      <li>
                        <button onClick={() => setConffirm(true)}>
                          Delete The Post
                        </button>
                      </li>
                    </ul>
                  )}
                  {isDeleting && <LoadingSpinner size="sm" />}
                </span>
              )}
            </div>
            <div className="flex flex-col pt-2 overflow-hidden">
              {post.text && (
                <div className="">
                  <AutoResizeTextarea text={post.text} />
                </div>
              )}

              {post.img && (
                <div className="relative h-60 sm:h-96 overflow-hidden">
                  <Image
                    fill
                    alt="Image"
                    src={post.img}
                    onClick={() => setIsModalOpen(post.img)}
                    className="object-contain  rounded-lg border border-gray-700"
                  />
                </div>
              )}
              {post.video && (
                <div className="relative   overflow-hidden">
                  <video
                    controls
                    className="w-full  min-h-[30rem] max-h-[37rem] object-contain rounded-lg border border-gray-700"
                  >
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-between">
                <Link
                  href={`/pages/Post/${post._id}`}
                  className="flex gap-1 items-center cursor-pointer group"
                >
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                  <span className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-600">
                    {comments.length}
                  </span>
                </Link>

                <div className="flex gap-1 items-center group cursor-pointer">
                  <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
                  <span className="text-xs sm:text-sm text-slate-500 group-hover:text-green-500">
                    0
                  </span>
                </div>

                <button
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleLikePost}
                >
                  {isLiking && <LoadingSpinner size="sm" />}
                  {!isLiked && !isLiking && (
                    <FaHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-red-600" />
                  )}
                  {isLiked && !isLiking && (
                    <FaHeart className="w-4 h-4 cursor-pointer text-red-600 " />
                  )}

                  <span
                    className={`text-sm  group-hover:text-red-600 ${
                      isLiked ? "text-red-600" : "text-slate-500"
                    }`}
                  >
                    {likes.length}
                  </span>
                </button>
              </div>
              <div className="flex w-1/3 justify-end gap-2 items-center">
                <button
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleSavePost}
                >
                  {isLSaveing && <LoadingSpinner size="sm" />}

                  {!isLSave && !isLSaveing && (
                    <FaBookmark className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-[#e99c09]" />
                  )}
                  {isLSave && !isLSaveing && (
                    <FaBookmark className="w-4 h-4 cursor-pointer text-[#e99c09] " />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
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
      {Conffirm && (
        <ConfirmModel
          setIsOpen={setIsOpen}
          setConffirm={setConffirm}
          handleDeletePost={handleDeletePost}
        />
      )}
    </React.Fragment>
  );
};

export default ISPost;
