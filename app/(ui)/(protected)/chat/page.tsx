// pages/chat.js

import MainChat from "@/components/chats/MainChat";
import UserProfile from "@/components/chats/UserProfile";
import React, { Suspense } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
const ChatPage = () => {
  if (typeof window !== "undefined") {
    document.documentElement.classList.add("dark");
    localStorage?.setItem("theme", "dark");
  }
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar container */}
      <div className="flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
        {/* Bot selection section */}
        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Farmer Chat
          </h2>
        </div>

        {/* User profile section */}
        <div className="mt-auto">
          {/* Assuming UserProfile adapts to theme changes internally */}
          <Suspense>
            <UserProfile />
          </Suspense>
        </div>
      </div>

      {/* Main chat section */}
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
        <ContextMenu>
          <ContextMenuTrigger>
            {/* Assuming MainChat adapts to theme changes internally */}
            <MainChat />
          </ContextMenuTrigger>
          <ContextMenuContent>
            {/* Assuming ContextMenuItem adapts to theme changes internally */}
            <ContextMenuItem>Zone</ContextMenuItem>
            <ContextMenuItem>Crop</ContextMenuItem>
            <ContextMenuItem>Language</ContextMenuItem>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Logout</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* Modal component also needs to adapt if it's part of the UI */}
      {/* <Modal /> */}
    </div>
  );
};

export default ChatPage;
