// "use client";
import React, { Suspense } from "react";
import UserProfile from "../chats/UserProfile";
import Link from "next/link";
import {
  Blocks,
  Boxes,
  BrainCircuit,
  Expand,
  ListFilter,
  LogIn,
  MessageSquareShare,
} from "lucide-react";
// import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { getChatSessions } from "@/utils/common";
import ThemeCustomization from "./ThemeChanger";
import { auth } from "@/auth";
import ChatSessions from "./sibebar/ChatSessions";
import AllAvailable from "./sibebar/AllAvailable";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const SidebarContent = async () => {
  const user = await auth();

  return (
    <>
      {/* Bot selection section */}
      <div className="flex flex-col flex-1">
        <Link href={"/chat"}>
          <h2 className="text-lg font-semibold justify-start text-black flex gap-2 dark:text-white">
            <Image
              src={"/primary-logo.svg"}
              height={300}
              width={300}
              alt="FC"
              className="h-10 w-full"
            />
          </h2>
        </Link>
        <div className="absolute top-4 right-0 m-4 lg:hidden block">
          <ThemeCustomization />
        </div>

        <button
          // onClick={() => setShowModal(true)}
          className="p-2 py-3 transition duration-500 ease-in-out rounded-full text-gray-300 bg-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 m-4 absolute right-10 top-4 lg:hidden flex  gap-1 items-center  dark:bg-gray-600"
        >
          <ListFilter size={"15"} className="" />
        </button>

        {/* </Link> */}
        <div className="mt-5">
          {/* <AllAvailable /> */}
          <Link
            href={"/services"}
            className="flex gap-5 p-2 hover:bg-gray-100 rounded-sm dark:hover:bg-gray-700"
          >
            <Blocks /> <span>Explore Services</span>
          </Link>
        </div>
        <div className="bg-white mt-5 dark:bg-gray-800 max-h-96 overflow-auto hide-scrollbar">
          <Suspense
            fallback={
              <div className="flex w-full justify-center items-center flex-col gap-3">
                <Skeleton className="h-4 w-[250px] bg-gray-200 rounded-lg" />
                <Skeleton className="h-4 w-[250px] bg-gray-200 rounded-lg" />
                <Skeleton className="h-4 w-[250px] bg-gray-200 rounded-lg" />
                <Skeleton className="h-4 w-[250px] bg-gray-200 rounded-lg" />
              </div>
            }
          >
            <ChatSessions />
          </Suspense>
        </div>
      </div>

      {/* User profile section */}
      <div className="mt-auto hidden">
        <Suspense
          fallback={
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                {/* <Skeleton className="h-4 w-[200px]" /> */}
              </div>
            </div>
          }
        >
          {/* <UserProfile /> */}
        </Suspense>
      </div>
    </>
  );
};

export default SidebarContent;
