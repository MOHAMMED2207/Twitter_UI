"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaBookmark, FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Posts from "../../Components/coomon/Posts";
import Image from "next/image";
import Link from "next/link";
import { MyProfile } from "../../Hook/Profile/MyProfile";
import { GetAllPosts } from "../../Hook/Posts/GetPostesAllFeedTypes/GetAllPosts";
import { formatMemberSinceDate, formatNumber } from "../../util/Date";
import ProfileHeaderSkeleton from "../../Components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./../../Hook/Profile/EditProfileModal";
import { useUpdateUserProfile } from "../../Hook/Profile/updateProfile";
import LoadingSpinner from "../../Components/coomon/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import MyFollowing from "../../Components/MYFollowing";
import { FollowButton } from "../../Hook/Follow/FollowButton";

const ProfilePage = () => {
  const router = useRouter();
  const scrollableDivRefProfile = useRef<HTMLDivElement | null>(null);

  const { username }: any = useParams<{ tag: string; item: string }>();
  // ============================================================================
  const [showFollowers, setshowFollowers] = useState(false);
  const [showFollowing, setshowFollowing] = useState(false);
  const [showType, setshowType] = useState("");
  const [Savelength, setSavelength] = useState(0);

  // ============================================================================

  const [coverImg, setCoverImg] = useState<any>(null);
  const [profileImg, setProfileImg] = useState<any>(null);
  const coverImgRef = useRef<any>(null);
  const profileImgRef = useRef<any>(null);

  const { data: authUser } = useQuery<any>({ queryKey: ["authUser"] });
  const { user, isLoading, refetch, isRefetching, error } = MyProfile({
    username,
  });

  const { isUpdatingProfile, updateProfile, isSuccess } =
    useUpdateUserProfile();

  const isMyProfile = authUser?._id === user?._id;

  const handleImgChange = (e: any, state: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    setSavelength(authUser?.savedPosts.length);
  }, [authUser?.savedPosts.length, authUser]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const [feedType, setFeedType] = useState("post");
  const { posts } = GetAllPosts({ username, feedType });

  const LengthPost = posts?.length > 0 ? posts?.length : 0;

  return (
    <div className="w-full overflow-auto">
      <div
        ref={scrollableDivRefProfile}
        className="flex-[4_4_0] pb-[60px] lg:pb-0 md:pb-0 border-r border-gray-700 min-h-screen "
      >
        {/* HEADER */}
        {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
        {!isLoading && !isRefetching && !user && error && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && !isRefetching && !error && user && (
            <>
              <div className="flex gap-10 px-4 py-2 items-center">
                <button onClick={() => router.back()}>
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{user?.username}</p>
                  <span className="text-sm text-slate-500">
                    {formatNumber(LengthPost)} Posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="relative group/cover">
                <div className="relative w-full object-cover min-h-56 max-h-96">
                  <Image
                    fill
                    src={coverImg || user?.CoverImg || "/cover.png"}
                    className=" object-cover"
                    alt=" image"
                  />
                </div>
                {isMyProfile && (
                  <div
                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                    onClick={() => coverImgRef.current.click()}
                  >
                    <MdEdit className="w-5 h-5 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                  <div className="w-32 rounded-full relative group/avatar">
                    <div className="relative w-28 h-28 lg:w-32 lg:h-32 md:w-32 md:h-32           overflow-hidden rounded-full">
                      <Image
                        fill
                        src={
                          profileImg || user?.ProfileImg || "/avatars/boy2.png"
                        }
                        className="object-cover"
                        alt="Profile  Image"
                      />
                    </div>

                    <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="w-4 h-4 text-white"
                          onClick={() => profileImgRef.current.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-5">
                {isMyProfile && <EditProfileModal authUser={authUser} />}
                {!isMyProfile && (
                  <FollowButton userId={user._id} username={user.username} />
                )}

                {(coverImg || profileImg) && (
                  <button
                    className="btn bg-blue-600 rounded-full btn-sm text-white px-4 ml-2"
                    onClick={async () => {
                      await updateProfile({
                        coverImg,
                        profileImg,
                        fullname: "",
                        username: "",
                        email: "",
                        bio: "",
                        link: "",
                        newPassword: "",
                        currentPassword: "",
                      });
                      setProfileImg(null);
                      setCoverImg(null);
                    }}
                  >
                    {!!isUpdatingProfile ? <LoadingSpinner /> : "Update"}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-14 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user?.fullname}</span>
                  <span className="text-sm text-slate-500">
                    @{user?.username}
                  </span>
                  <span className="text-sm my-1 ">{user?.bio}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {user?.link && (
                    <div className="flex gap-1     items-center ">
                      <FaLink className="w-3 h-3 text-slate-500" />
                      <Link
                        href={user?.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm truncate w-36 md:w-64 lg:w-64 text-blue-500 hover:underline"
                      >
                        {user?.link}
                      </Link>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {formatMemberSinceDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {formatNumber(user?.following.length)}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setshowType("Following");
                          setshowFollowing(!showFollowing);
                          setshowFollowers(false);
                        }}
                        className="text-slate-500 text-xs"
                      >
                        Following
                      </button>
                      <div className="absolute">
                        {showFollowing && <MyFollowing type={showType} />}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {formatNumber(user?.followers.length)}
                    </span>

                    <div className="relative">
                      <button
                        onClick={() => {
                          setshowType("Followers");
                          setshowFollowers(!showFollowers);
                          setshowFollowing(false);
                        }}
                        className="text-slate-500 text-xs"
                      >
                        Followers
                      </button>
                      <div className="absolute">
                        {showFollowers && <MyFollowing type={showType} />}
                      </div>
                    </div>
                  </div>
                </div>
                {isMyProfile && (
                  <Link
                    href={`/pages/SavePost/${authUser.username}`}
                    className="flex gap-1 items-center"
                  >
                    <FaBookmark
                      size={30}
                      className="cursor-pointer text-[#e99c09] "
                    />
                    <div>
                      <span className="font-bold pr-1 text-[31px] text-slate-500">
                        {formatNumber(Savelength)}
                      </span>

                      <span className="text-slate-500  text-xs">Post Save</span>
                    </div>
                  </Link>
                )}
              </div>

              <div className="flex w-full border-b border-gray-700 mt-4">
                <div
                  className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType("post")}
                >
                  Posts
                  {feedType === "post" && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType("likes")}
                >
                  Likes
                  {feedType === "likes" && (
                    <div className="absolute bottom-0 w-10  h-1 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            </>
          )}
          {!isLoading && !isRefetching && !error && user && (
            <Posts
              feedType={feedType}
              scrollableDivRefProfile={scrollableDivRefProfile}
              username={username}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
