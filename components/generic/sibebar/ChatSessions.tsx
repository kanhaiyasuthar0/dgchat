import { MessageSquareShare } from "lucide-react";
import React from "react";

const ChatSessions = async () => {
  console.log(process.env.DEPLOYED_URL, "process.env.DEPLOYED_URL");
  const response = await fetch(`http://localhost:3000/api/chatsession/`, {
    method: "GET",
  });
  const { chatSessions } = await response.json();
  //   console.log("🚀 ~ SidebarContent ~ data:", chatSessions);
  return (
    <>
      {chatSessions?.length > 0 &&
        chatSessions?.map(
          (
            eachChat: { name: string; someid: string; creationtime: string },
            index: number
          ) => {
            return (
              <div
                key={eachChat?.name}
                className="group flex gap-1 align-middle justify-between p-2 rounded-lg cursor-pointer items-center border-gray-200 dark:border-gray-700 hover:bg-gray-100  dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className=" truncate max-w-48 text-sm text-ellipsis  ">
                  {eachChat.name}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MessageSquareShare size={"15"} className="" />
                </div>
              </div>
            );
          }
        )}
    </>
  );
};

export default ChatSessions;
