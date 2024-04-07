
import React, { Suspense } from "react";
import UserProfile from "../chats/UserProfile";

const SidebarContent = () => {
  return (
    <>
      {/* Bot selection section */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Farmer Chat
        </h2>
      </div>

      {/* User profile section */}
      <div className="mt-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile />
        </Suspense>
      </div>
    </>
  );
};

export default SidebarContent;
