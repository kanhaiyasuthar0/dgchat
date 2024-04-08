"use client";
// pages/chat.js

import MainChat from "@/components/chats/MainChat";
import UserProfile from "@/components/chats/UserProfile";
import React, { Suspense, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import ButtonForSidebarToggle from "@/components/generic/ButtonForSidebarToggle";
import SidebarContent from "@/components/generic/SidebarContent";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ThemeCustomization from "../generic/ThemeChanger";

interface ResponseType {
  youtube_url: string;
  query_response: string;
  condensed_question: string;
  follow_up_questions: string[];
  query: string;
}

interface IChatExchange {
  id: number;
  query: string;
  response?: ResponseType; // Optional since the response will be populated later
  loading?: boolean;
}

const MainChatPage = ({
  states,
  history,
}: {
  states: string[];
  history: any;
}) => {
  const { data, status, update } = useSession();
  // console.log("🚀 ~ ChatPage ~ data:", data, status, update);

  // if (!data) {
  //   signOut({ callbackUrl: "/" });
  //   // redirect("/");
  // }
  if (typeof window !== "undefined" && !localStorage?.getItem("theme")) {
    document.documentElement.classList.add("dark");
    localStorage?.setItem("theme", "dark");
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden">
      {/* Sidebar container - Make it a collapsible menu on smaller screens */}
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 z-30`}
      >
        <ButtonForSidebarToggle
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* Sidebar content */}
        {/* <div className="flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out z-30"> */}
        {/* Toggler for smaller screens */}
        <div className="absolute top-4 right-0 m-4 lg:hidden block">
          <ThemeCustomization />
        </div>
        <SidebarContent />

        {/* </div> */}
      </div>

      {/* Main chat section */}
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900 overflow-auto">
        <ContextMenu>
          <ContextMenuTrigger>
            <Suspense fallback={<div>Loading...</div>}>
              <MainChat
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                states={states}
                history={history}
              />
            </Suspense>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Zone</ContextMenuItem>
            <ContextMenuItem>Crop</ContextMenuItem>
            <ContextMenuItem>Language</ContextMenuItem>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Logout</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
};

export default MainChatPage;
