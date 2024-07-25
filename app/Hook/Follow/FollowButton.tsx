// في مكون آخر حيث تستخدم `follow`

import React from "react";
import useFollow from "./useFollow";
import LoadingSpinner from "../../Components/coomon/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

export const FollowButton = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const { follow, isPending } = useFollow();

  const { data: authUser } = useQuery<any>({ queryKey: ["authUser"] });
  // const { user } = MyProfile({
  //   username,
  // });
  const amIFollowing = authUser?.following.includes(userId);

  const handleFollow = (e: any) => {
    e.preventDefault();
    follow({
      userId,
      username
    });
  };

  return (
    <button
      className={`btn border-2 ${
        amIFollowing && "bg-blue-600"
      }  border-blue-600 px-2 py-1 hover:bg-blue-600 transition-all btn-outline rounded-full btn-sm`}
      onClick={handleFollow}
    >
      {isPending && <LoadingSpinner />}
      <span className="text-sm">
        {!isPending && amIFollowing && "Unfollow"}
        {!isPending && !amIFollowing && "Follow"}
      </span>
    </button>
  );
};
