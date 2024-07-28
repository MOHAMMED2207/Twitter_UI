import React, { useEffect, useState } from "react";
import { useFetchNotifications } from "../Hook/Notifaction/useFetchNotifications";
import Link from "next/link";
import Image from "next/image";
import {
  FaRegComment,
  FaHeart,
  FaUser,
  FaRegBookmark,
  FaCommentDots,
} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { BiRepost } from "react-icons/bi";
import { formatPostDate } from "../util/Date";
import { useAuth } from "../lib/Provider";
import AutoResizeTextarea from "./AutoResizeTextarea";

export const ModelNotification = () => {
  const [statusCheek, setStatusCheek] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // حالة للتحكم في ظهور الإشعار

  const { firstUnreadNotification } = useFetchNotifications();
  const { authUser } = useAuth();

  useEffect(() => {
    if (firstUnreadNotification) {
      if (formatPostDate(firstUnreadNotification?.createdAt) === "Just now") {
        setStatusCheek(true);
        setIsVisible(true); // إظهار الإشعار

        setTimeout(() => {
          setIsVisible(false); // إخفاء الإشعار بعد 5 ثوانٍ
        }, 2000);
      } else {
        setStatusCheek(false);
      }
    } else {
      setIsVisible(false);
      setStatusCheek(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUnreadNotification?.createdAt]);

  useEffect(() => {
    const CurentLikes =
      firstUnreadNotification && firstUnreadNotification.post?.likes;

    if (CurentLikes) {
      setIsLiked(CurentLikes.includes(authUser?._id || ""));
    } else {
      setIsLiked(false);
    }
  }, [firstUnreadNotification, authUser]);

  const handleCloseNotification = () => {
    setIsVisible(false); // إخفاء الإشعار عند النقر على زر الإخفاء
  };

  return (
    <React.Fragment>
      {statusCheek && firstUnreadNotification && isVisible && (
        <div
          key={firstUnreadNotification._id}
          className={`fixed w-full top-0 max-w-screen-sm p-2 transition-transform ease-in-out duration-500 z-[9999999999] rounded-lg bg-black left-1/2 transform -translate-x-1/2 ${
            isVisible
              ? "translate-y-0 transition-transform ease-in-out duration-500"
              : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col gap-2 w-full p-4 bg-[#0f1011] border-2 rounded-lg border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex flex-col justify-center">
                <div className="flex items-start gap-2">
                  <div className="avatar">
                    <Link
                      href={`/pages/Profile/${firstUnreadNotification.from.username}`}
                      className="w-8 rounded-full overflow-hidden"
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          fill
                          alt="Post Image"
                          className="object-cover"
                          src={
                            firstUnreadNotification.from.ProfileImg ||
                            "/avatars/avatar-placeholder.png"
                          }
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col justify-start items-start">
                    <div className="flex  flex-col lg:flex-row md:flex-row gap-0 lg:gap-2 md:gap-2 items-start lg:items-center md:items-center">
                      <Link
                        href={`/pages/Profile/${firstUnreadNotification.from.username}`}
                        className="font-bold truncate lg:w-24 md:w-24 w-40"
                      >
                        {firstUnreadNotification.from.fullname}
                      </Link>
                      <span className="text-gray-700 flex gap-1 text-xs sm:text-sm">
                        <Link
                          href={`/pages/Profile/${firstUnreadNotification.from.username}`}
                        >
                          @{firstUnreadNotification.from.username}
                        </Link>
                        <span>·</span>
                        <span>
                          {formatPostDate(firstUnreadNotification.createdAt)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex ml-3 flex-col gap-2 mt-2 overflow-hidden">
                  {firstUnreadNotification.type === "comment" && (
                    <span className="flex items-center gap-2">
                      <FaCommentDots className="w-7 h-6 text-blue-600" />
                      <span>
                        {firstUnreadNotification.from.username} commented on
                        your post
                      </span>
                    </span>
                  )}
                  {firstUnreadNotification.type === "like" && (
                    <span className="flex  gap-2">
                      <FaHeart className="w-5 h-5 text-red-500" />

                      <span className="flex flex-row w-full  ">
                        <Link
                          href={`/pages/Profile/${firstUnreadNotification.from.username}`}
                          className="text-blue-500  hidden md:flex lg:flex underline pr-2"
                        >
                          {firstUnreadNotification.from.username}
                        </Link>
                        <span>liked your post</span>
                      </span>
                    </span>
                  )}
                  {firstUnreadNotification.type === "follow" && (
                    <span className="flex items-center gap-2">
                      <FaUser className="w-6 h-5 text-blue-600" />
                      <span>
                        {firstUnreadNotification.from.username} started
                        following you
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <button className="bg-[#0000003a]  p-1 rounded-full">
                <IoCloseSharp
                  onClick={handleCloseNotification}
                  // className="text-white bg-red-500 hover:bg-red-700 rounded px-2 py-1"
                  size={20}
                />
              </button>
            </div>

            {firstUnreadNotification.type !== "follow" &&
              firstUnreadNotification.post && (
                <div className="notification-box w-full my-2 rounded-lg bg-[#1c2029]">
                  <div className="flex flex-col gap-2 items-start p-4 border-2 rounded-lg border-gray-700">
                    <div className="flex gap-2 items-center">
                      <Link
                        href={`/pages/Profile/${firstUnreadNotification.post.user.username}`}
                      >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            fill
                            alt="Post Image"
                            className="object-cover"
                            src={
                              firstUnreadNotification.post.user.ProfileImg ||
                              "/avatars/avatar-placeholder.png"
                            }
                          />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <Link
                          href={`/pages/Profile/${firstUnreadNotification.post.user.username}`}
                          className="font-bold truncate w-24 sm:w-40"
                        >
                          {firstUnreadNotification.post.user.fullname}
                        </Link>
                        <span className="text-gray-700 flex gap-1 text-xs sm:text-sm">
                          <Link
                            href={`/pages/Profile/${firstUnreadNotification.post.user.username}`}
                          >
                            @{firstUnreadNotification.post.user.username}
                          </Link>
                          <span>·</span>
                          <span>
                            {formatPostDate(
                              firstUnreadNotification.post.createdAt
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full flex-col  overflow-hidden">
                      <span className="max-h-11 overflow-hidden mb-3 ">
                        <AutoResizeTextarea
                          text={firstUnreadNotification.post.text}
                        />
                      </span>
                      {firstUnreadNotification.post.img && (
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            fill
                            alt="Image"
                            src={firstUnreadNotification.post.img}
                            className=" object-contain w-full rounded-lg border border-gray-700"
                          />
                        </div>
                      )}

                      {firstUnreadNotification.post.video && (
                        <div className="relative h-32  overflow-hidden">
                          <video
                            controls
                            className="w-full h-full object-cover rounded-lg border border-gray-700"
                          >
                            <source
                              src={firstUnreadNotification.post.video}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
