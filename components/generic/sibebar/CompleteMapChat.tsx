"use client";

import { MessageSquareShare } from "lucide-react";
import Link from "next/link";

const CompleteMapChat = ({ data }: any) => {
  return (
    <>
      {data?.length > 0 &&
        data?.map((eachChat: any, index: number) => {
          return (
            <Link key={eachChat?.name} href={`/chat/?id=${eachChat?.someid}`}>
              <div className="group flex gap-1 align-middle justify-between p-2 rounded-lg cursor-pointer items-center border-gray-200 dark:border-gray-700 hover:bg-gray-100  dark:hover:bg-gray-700 transition-colors duration-200">
                <div className=" truncate max-w-48 text-sm text-ellipsis  ">
                  {eachChat.name}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MessageSquareShare size={"15"} className="" />
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default CompleteMapChat;
