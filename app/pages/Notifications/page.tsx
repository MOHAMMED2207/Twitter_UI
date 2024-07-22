"use client";
import RightPanel from "../../Components/coomon/RightPanel";
import Sidebar from "../../Components/coomon/Sidebar";
import { AuthProvider, useAuth } from "../../lib/Provider";
import React from "react";
import AllNotifications from "./AllNotifications";
import { usePathname } from "next/navigation";
import { ModelNotification } from "../../Components/ModelNotifcation";

const page = () => {
  // استخدام AuthProvider على مستوى أعلى هنا
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
};

const PageContent = () => {
  const { authUser } = useAuth();
  const pathname = usePathname();

  return (
    <React.Fragment>
      <ModelNotification />
      {authUser && (
        <div className="flex max-w-6xl mx-auto">
          <Sidebar />
          <AllNotifications />
          <RightPanel />
        </div>
      )}
    </React.Fragment>
  );
};

export default page;
