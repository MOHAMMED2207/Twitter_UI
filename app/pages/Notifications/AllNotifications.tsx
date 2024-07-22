"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart, FaCommentDots } from "react-icons/fa6";
import Image from "next/image";
import { formatPostDate } from "../../util/Date";
import NotifcationSkeleton from "../../Components/skeletons/NotifcationSkeleton";
import { DeleteNotifction } from "../../Hook/Notifaction/DeleteNotifction";
import { GetNotiffcation } from "../../Hook/Notifaction/GetNotiffcation";

const AllNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteClick = () => {
    HandelDeleteNotifications();
    setIsOpen(false); // إغلاق النافذة بعد تنفيذ الدالة
  };

  const { notifications, isLoading, isRefetching, error } = GetNotiffcation();
  const { deleteNotifications } = DeleteNotifction();

  const HandelDeleteNotifications = () => {
    deleteNotifications();
  };

  return (
    <div className=" w-full h-[calc(100vh-56px)] overflow-auto lg:h-screen md:h-screen">
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
        <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
          <div className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-700 bg-black z-10">
            <p className="font-bold">Notifications</p>
            <div className="relative w-max">
              <div
                tabIndex={0}
                role="button"
                className="m-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoSettingsOutline className="w-4" />
              </div>
              {isOpen && (
                <ul className="absolute w-max top-7 right-0 bg-black border-gray-700 border-2 hover:transition-all hover:border-black hover:bg-red-600 rounded-lg z-10 p-2 shadow ">
                  <li>
                    <button onClick={handleDeleteClick}>
                      Delete all notifications
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {(isLoading || isRefetching) && (
              <div className="flex flex-col">
                <NotifcationSkeleton notifications={notifications} />
              </div>
            )}

            {error && (
              <p className="text-center text-lg mt-4">User not found</p>
            )}

            {!isLoading && !isRefetching && notifications?.length === 0 && (
              <div className="text-center p-4 font-bold">
                No notifications 🤔
              </div>
            )}

            {!isLoading && !isRefetching && !error && notifications && (
              <>
                {notifications?.map((notification: any) => (
                  <div
                    className="border-b border-gray-700"
                    key={notification?._id}
                  >
                    <div className="flex gap-2 p-4">
                      <Link href={`/pages/Profile/${notification.from?.username}`}>
                        <div className="flex flex-row gap-4">
                          <div className="relative flex w-11 h-12 avatar">
                            <div className="relative w-11 h-11 overflow-hidden rounded-full">
                              <Image
                                fill
                                alt="img"
                                src={
                                  notification.from?.ProfileImg ||
                                  "/avatars/avatar-placeholder.png"
                                }
                              />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-black border-2 border-black rounded-full">
                              {notification?.type === "follow" && (
                                <FaUser className="w-4 h-4 text-blue-600" />
                              )}
                              {notification?.type === "like" && (
                                <FaHeart className="w-4 h-4 text-red-500" />
                              )}
                              {notification?.type === "comment" && (
                                <FaCommentDots className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold flex flex-row gap-2 items-center justify-start">
                              {notification.from?.username}
                              <h1 className="text-sm text-gray-400">
                                {formatPostDate(notification?.createdAt)}
                              </h1>
                            </span>
                            {notification?.type === "follow" &&
                              "Start following you"}
                            {notification?.type === "like" && "liked your post"}
                            {notification?.type === "comment" &&
                              "commented on your post"}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNotifications;
