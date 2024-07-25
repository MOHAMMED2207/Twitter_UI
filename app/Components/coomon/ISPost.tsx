import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaRegComment, FaHeart, FaRegBookmark } from "react-icons/fa";
import { BiRepost, BiVideo } from "react-icons/bi";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../util/Date";
import { FnCommentProcess } from "../../Hook/Posts/Comment/FnCommentProcess";
import { FnLikeProcess } from "../../Hook/Posts/Likes/FnLikes";
import { FnDeleteProcess } from "../../Hook/Delete/FnDeleteProcess";
import { ISPostProps } from "../../Types/type";
import { VscListSelection } from "react-icons/vsc";
import { CiImageOn } from "react-icons/ci";
import Link from "next/link";
import { useAuth } from "../../lib/Provider";
import { ConfirmModel } from "../ConfirmModel";
import AutoResizeTextarea from "../AutoResizeTextarea";

const ISPost = ({ post }: ISPostProps) => {
  // ----------------------------------------------------------------------------------------------------
  const { authUser } = useAuth();
  const postOwner = post.user;
  const formattedDate = formatPostDate(post.createdAt);
  const isMyPost = post.user._id === authUser?._id;
  // ----------------------------------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [Disabld, setDisabld] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [Conffirm, setConffirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState<any>(null);
  const [video, setVideo] = useState<any>(null); // حالة للفيديو
  const ImgRef = useRef<any>(null);
  const VideoRef = useRef<any>(null);
  // ----------------------------------------------------------------------------------------------------

  const isLiked =
    Array.isArray(post.likes) && post.likes.includes(authUser?._id || "");

  const { likePost, isLiking } = FnLikeProcess({ post });

  // ----------------------------------------------------------------------------------------------------
  const { commentPost, isCommenting } = FnCommentProcess({
    post,
    authUser,
    setText,
    setImg,
    setVideo,
  });
  // ----------------------------------------------------------------------------------------------------
  const { deletePost, isDeleting } = FnDeleteProcess({
    post,
  });
  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------
  const handleDeletePost = () => {
    deletePost();
    setConffirm(false);
    setIsOpen(false);
  };
  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------
  const handlePostComment = (e: any) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost({ text, img, video });
  };
  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------
  const handleLikePost = () => {
    likePost();
  };
  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------
  const handleMediaChange = (e: any, setMedia: Function) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); // قراءة الملف
      reader.onload = () => {
        setMedia(reader.result); // تعيين نتيجة القراءة إلى الحالة
      };
      reader.readAsDataURL(file);
    }
  };
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    !text && !img && !video ? setDisabld(true) : setDisabld(false);
  }, [text, img, video]);

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex  sm:flex-row gap-2 items-start p-4 border-y border-gray-700">
          <Link href={`/pages/Profile/${postOwner.username}`}>
            <div className="avatar">
              <div className="relative w-10 h-10  md:h-14 lg:h-14 md:w-14 lg:w-14 rounded-full overflow-hidden">
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
              <AutoResizeTextarea text={post.text} />

                  {post.img && (
                <div className="relative h-60 sm:h-96 overflow-hidden">
                  <Image
                    fill
                    alt="Image"
                    src={post.img}
                    onClick={() => setIsModalOpen(post.img)}
                    className="object-contain rounded-lg border border-gray-700"
                  />
                </div>
              )}
                 {post.video && (
                <div className="relative overflow-hidden">
                  <video
                    controls
                    preload="auto"
                    className="w-full min-h-[30rem] max-h-[37rem] object-contain rounded-lg border border-gray-700"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  >
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}


            </div>



            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-between">
                <div
                  className="flex gap-1 items-center cursor-pointer group"
                  onClick={() => setShowComments(!showComments)}
                >
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  <span className="text-xs sm:text-sm text-slate-500 group-hover:text-sky-400">
                    {post.comments.length}
                  </span>
                </div>

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
                    {post.likes.length}
                  </span>
                </button>
              </div>
              <div className="flex w-1/3 justify-end gap-2 items-center">
                <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        {showComments && (
          <section
            id={`comments_modal${post._id}`}
            className="w-full backdrop-blur-sm relative bg-[#0f1012] p-4 mx-auto"
          >
            <h3 className="font-os text-lg font-bold">Comments</h3>

            <div className="overflow-y-auto min-h-0 max-h-64">
              {post.comments.length === 0 ? (
                <p className="text-md mt-2 text-gray-400">
                  No comments yet 🤔 Be the first one 😉
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment._id} className="flex  border-t-2 py-4 border-[#393a3a] ">
                    <Link href={`/pages/Profile/${comment.user.username}`}>
                      <div className="avatar">
                        <div className="relative w-10 h-10  md:h-14 lg:h-14 md:w-14 lg:w-14 rounded-full">
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
                    <div className="ml-3 w-full ">
                      <Link href={`/pages/Profile/${comment.user.username}`}>
                        <div className="font-medium text-white">
                          {comment.user.fullname}
                        </div>
                        <div className="font-medium opacity-45 text-sm">
                          @{comment.user.username}
                        </div>
                      </Link>
                      <div className="mt-2 w-full text-white">
                        {comment.text}
                      </div>
                      {comment.img && (
                        <div className="relative  max-w-sm min-h-48 max-h-72  overflow-hidden">
                          <Image
                            fill
                            alt="Image"
                            src={comment.img}
                            className="object-contain  w-full    rounded-lg border border-gray-700"
                          />
                        </div>
                      )}
                      {comment.video && (
                        <div className="relative overflow-hidden">
                          <video
                            controls
                            className="w-full  h-60  object-contain rounded-lg border border-gray-700"
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
              className="mt-4 pt-2 border-t-2 border-[#393a3a] "
              onSubmit={handlePostComment}
            >
              {img && (
                <div className="relative w-36  h-36 mx-auto">
                  <IoCloseSharp
                    className="absolute z-10 top-0 right-0 text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
                    onClick={() => {
                      setImg(null);
                      ImgRef.current.value = null; // حذف رابط الصورة
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
                      VideoRef.current.value = null; // حذف رابط الفيديو
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

              <div className="flex flex-row gap-2 items-center justify-between">
                <div>
                  <div className="flex gap-1 mt-2 items-center">
                    <CiImageOn
                      className="fill-primary w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setVideo(null);
                        ImgRef.current.click();
                      }} // فتح نافذة اختيار الملفات
                    />
                    <BiVideo
                      className="fill-primary w-6 h-6 cursor-pointer" // أيقونة الفيديو
                      onClick={() => {
                        setImg(null);
                        VideoRef.current.click();
                      }} // فتح نافذة اختيار الملفات للفيديو
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

                <div className="flex w-full items-center gap-2">
                  <input
                    id="comment"
                    placeholder="Add a comment..."
                    name="comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className=" py-1  w-10/12 text-black mt-2  pl-2 outline-none rounded-full"
                  ></input>

                  <button
                    type="submit"
                    disabled={Disabld}
                    className={`border-blue-600 ISdisabled mt-2 mr-4 lg:mr-0 md:mr-0 border-2 text-white font-medium py-2 px-6 rounded-full hover:transition-all hover:bg-blue-600`}
                  >
                    {isCommenting ? <LoadingSpinner size="md" /> : <IoSend />}
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
            <IoCloseSharp
              className="absolute z-50 top-4 right-4 text-white bg-gray-800 rounded-full p-1 w-8 h-8 cursor-pointer"
              onClick={() => setIsModalOpen("")}
            />
            <Image
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
