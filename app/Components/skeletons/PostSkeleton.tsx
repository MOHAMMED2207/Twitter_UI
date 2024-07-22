const PostSkeleton = () => {
	return (
		<div className="flex gap-2 items-start p-4 border-b border-gray-700">
  <div className="avatar">
    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
  </div>
  <div className="flex flex-col flex-1 gap-2">
    <div className="flex gap-2 items-center">
      <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
      <div className="w-16 h-4 bg-gray-700 animate-pulse rounded"></div>
      <div className="flex-1"></div>
      <div className="w-4 h-4 bg-gray-700 animate-pulse rounded-full"></div>
    </div>
    <div className="flex flex-col gap-3 overflow-hidden">
      <div className="h-4 bg-gray-700 animate-pulse rounded"></div>
      <div className="h-96 bg-gray-700 animate-pulse rounded-lg"></div>
    </div>
    <div className="flex justify-between mt-3">
      <div className="flex gap-4 items-center w-2/3 justify-between">
        <div className="flex gap-1 items-center cursor-pointer">
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded-full"></div>
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <div className="w-6 h-6 bg-gray-700 animate-pulse rounded-full"></div>
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded-full"></div>
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="flex w-1/3 justify-end gap-2 items-center">
        <div className="w-4 h-4 bg-gray-700 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
</div>

	);
};
export default PostSkeleton;
