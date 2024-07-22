"use client";
import Sidebar from "../../Components/coomon/Sidebar";
import React from "react";
import { AuthProvider, useAuth } from "../../lib/Provider";
import { PostAreay } from "../../Components/coomon/PostAreay";
import RightPanel from "../../Components/coomon/RightPanel";
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

  return (
    <React.Fragment>
      <ModelNotification />
      {authUser && (
        <div className="flex  max-w-6xl mx-auto">
          <Sidebar />
          <PostAreay />
          <RightPanel />
        </div>
      )}

    </React.Fragment>
  );
};

export default page;
