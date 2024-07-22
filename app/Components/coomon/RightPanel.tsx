import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import Link from "next/link";
import Image from "next/image";
import { FollowButton } from "../../Hook/Follow/FollowButton";
import { FnSuggestedUsers } from "../../Hook/Suggested/FnSuggestedUsers";
import SearchBar from "../searsh";

const RightPanel = () => {
  const { suggestedUsers, isLoading } = FnSuggestedUsers();

  return (
    <div className="hidden sticky top-16 lg:block my-4 mx-2">
      <SearchBar />
      <div className="bg-[#16181C] p-4 rounded-md sticky top-16">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4 mt-3">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
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
                          user.ProfileImg || "/avatars/avatar-placeholder.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullname}
                    </span>
                    <span className="text-sm text-slate-500 truncate w-28">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <FollowButton userId={user._id} username={user.username} />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
