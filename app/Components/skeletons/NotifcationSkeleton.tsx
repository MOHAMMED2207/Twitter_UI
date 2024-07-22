const NotifcationSkeleton = ({ notifications }: any) => {
  return (
    <div className="md:flex-[2_2_0] w-full">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-full">
        <div className="flex justify-center md:justify-start p-4">
          <div className="w-12 h-12 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
        <ul className="flex flex-col gap-3 mt-4">
          {notifications?.length > 0 ? (
            notifications.map((_: any, idx: any) => (
              <li key={idx} className="flex justify-center md:justify-start">
                <div className="flex gap-3 items-center bg-gray-800 rounded-full py-2 pl-2 pr-4 w-full animate-pulse">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <span className="text-lg hidden md:block bg-gray-700 h-5 w-24 rounded"></span>
                </div>
              </li>
            ))
          ) : (
            // إذا لم تكن هناك إشعارات، يمكنك عرض رسالة أو هيكل عظمي افتراضي
            <li className="flex justify-center md:justify-start">
              <div className="flex gap-3 items-center bg-gray-800 rounded-full py-2 pl-2 pr-4 w-full animate-pulse">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <span className="text-lg hidden md:block bg-gray-700 h-5 w-24 rounded"></span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotifcationSkeleton;
