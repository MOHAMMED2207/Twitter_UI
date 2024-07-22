"use client";
import Sidebar from "../../Components/coomon/Sidebar";
import React from "react";
import { AuthProvider } from "../../lib/Provider";
import { ModelNotification } from "../../Components/ModelNotifcation";
import Image from "next/image";
import Link from "next/link";
import RightPanelSkeleton from "../../Components/skeletons/RightPanelSkeleton";
import { FnSuggestedUsers } from "../../Hook/Suggested/FnSuggestedUsers";
import SearchBar from "../../Components/searsh";
import { FollowButton } from "../../Hook/Follow/FollowButton";

const page = () => {
  // استخدام AuthProvider على مستوى أعلى هنا
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
};

const PageContent = () => {
  const { suggestedUsers, isLoading } = FnSuggestedUsers();

  return (
    <React.Fragment>
      <ModelNotification />
      <div className="flex  max-w-6xl mx-auto">
      <Sidebar />

        <div className="my-4 mx-2 w-full ">
          <div className="sticky top-2">
            <SearchBar />
            <div className="bg-[#16181C] p-4 rounded-md mt-4">
              <p className="font-bold text-white">Who to follow</p>
              <div className="flex flex-col gap-4 mt-3">
                {isLoading ? (
                  <>
                    <RightPanelSkeleton />
                    <RightPanelSkeleton />
                    <RightPanelSkeleton />
                    <RightPanelSkeleton />
                    <RightPanelSkeleton />
                    <RightPanelSkeleton />
                  </>
                ) : (
                  suggestedUsers?.map((user: any) => (
                    <Link
                      href={`/pages/Profile/${user.username}`}
                      className="flex items-center justify-between gap-4"
                      key={user._id}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="avatar">
                          <div className="relative w-14 h-14 overflow-hidden rounded-full">
                            <Image
                              fill
                              alt=" Image"
                              className="object-contain"
                              src={
                                user.ProfileImg ||
                                "/avatars/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold tracking-tight truncate w-28 text-white">
                            {user.fullname}
                          </span>
                          <span className="text-sm text-slate-500 truncate w-28">
                            @{user.username}
                          </span>
                        </div>
                      </div>
                      <div>
                        <FollowButton
                          userId={user._id}
                          username={user.username}
                        />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
