// export default Page;
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { AuthProvider, useAuth } from "@/app/lib/Provider";
import React from "react";
import Sidebar from "../../../Components/coomon/Sidebar";
import RightPanel from "../../../Components/coomon/RightPanel";
import ProfilePage from "../ProfilePage";
import { ModelNotification } from "../../../Components/ModelNotifcation";

const Page = () => {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
};

const PageContent = () => {
  const { authUser } = useAuth();

  return (
    <React.Fragment>
      <ModelNotification />
      {authUser && (
        <div className="flex max-w-6xl mx-auto">
          <Sidebar />
          <ProfilePage />
          <RightPanel />
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
