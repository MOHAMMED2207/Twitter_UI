import React from "react";
import { Provider } from "../util/Provider";

export const User = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-green-600">
      <Provider>{children}</Provider>
    </div>
  );
};
