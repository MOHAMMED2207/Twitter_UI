const RightPanelSkeleton = () => {
	return (
	  <div className="flex items-center justify-between gap-4">
		<div className="flex gap-2 items-center">
		  <div className="avatar">
			<div className="w-14 h-14 rounded-full bg-gray-700 animate-pulse"></div>
		  </div>
		  <div className="flex flex-col gap-2">
			<div className="w-28 h-4 bg-gray-700 animate-pulse rounded"></div>
			<div className="w-20 h-4 bg-gray-700 animate-pulse rounded"></div>
		  </div>
		</div>
		<div className="w-16 h-8 bg-gray-700 animate-pulse rounded-full"></div>
	  </div>
	);
  };
  
export default RightPanelSkeleton;
