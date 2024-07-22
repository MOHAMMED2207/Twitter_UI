import React from "react";
import { Provider } from "../util/Provider";
import { Toaster } from "react-hot-toast";

export function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Provider>
        {children}
        <Toaster />
      </Provider>
    </div>
  );
}
