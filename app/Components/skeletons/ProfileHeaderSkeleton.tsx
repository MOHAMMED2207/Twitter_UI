import React from "react";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-10 px-4 py-2 items-center">
        <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
        <div className="flex flex-col">
          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
          <div className="w-16 h-4 bg-gray-700 animate-pulse rounded mt-2"></div>
        </div>
      </div>
      
      {/* COVER IMG */}
      <div className="relative group/cover">
        <div className="relative w-full min-h-56 max-h-96 bg-gray-700 animate-pulse"></div>
        <div className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200">
          <div className="w-5 h-5 bg-gray-700 animate-pulse rounded"></div>
        </div>
        
        <div className="avatar absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full bg-gray-700 animate-pulse"></div>
        </div>
      </div>
      
      <div className="flex justify-end px-4 mt-5">
        <div className="w-24 h-8 bg-gray-700 animate-pulse rounded-full"></div>
      </div>
      
      <div className="flex flex-col gap-4 mt-14 px-4">
        <div className="flex flex-col">
          <div className="w-32 h-4 bg-gray-700 animate-pulse rounded"></div>
          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded mt-2"></div>
          <div className="w-full h-4 bg-gray-700 animate-pulse rounded mt-2"></div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1 items-center ">
            <div className="w-3 h-3 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-32 h-4 bg-gray-700 animate-pulse rounded"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <div className="w-8 h-4 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-16 h-4 bg-gray-700 animate-pulse rounded"></div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-8 h-4 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-16 h-4 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full border-b border-gray-700 mt-4">
        <div className="flex justify-center flex-1 p-3 bg-gray-700 animate-pulse rounded"></div>
        <div className="flex justify-center flex-1 p-3 bg-gray-700 animate-pulse rounded ml-2"></div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
