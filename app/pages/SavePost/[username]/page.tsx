// export default Page;
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Sidebar from "@/app/Components/coomon/Sidebar";
import { ModelNotification } from "@/app/Components/ModelNotifcation";
import { AuthProvider, useAuth } from "@/app/lib/Provider";
import React from "react";
import SavePost from "../SavePost";
import RightPanel from "@/app/Components/coomon/RightPanel";

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
          <SavePost />
          <RightPanel />
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
