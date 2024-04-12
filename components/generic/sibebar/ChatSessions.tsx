import { MessageSquareShare } from "lucide-react";
import React from "react";

const ChatSessions = async () => {
  console.log(process.env.DEPLOYED_URL, "process.env.DEPLOYED_URL");
  //   const response = await fetch(`https://farmerchat.vercel.app/api/chatsession/`, {
  //     method: "GET",
  //   });
  //   const { chatSessions } = await response.json();
  //   console.log("🚀 ~ SidebarContent ~ data:", chatSessions);
  const data = [
    {
      name: "Spring Planting Queries",
      someid: "4f5a2c17-a687-4e4c-9d3b-93c8f64f1db4",
      creationDate: new Date(2023, 3, 10, 14, 30).toISOString(),
    },
    {
      name: "Irrigation Solutions Discussion",
      someid: "be98e057-ca0d-4f5b-8b0e-688a95c7e65b",
      creationDate: new Date(2023, 3, 11, 15, 45).toISOString(),
    },
    {
      name: "Organic Farming Tips",
      someid: "e4b99ad3-d403-4fb7-a2ab-6f734d73d6b7",
      creationDate: new Date(2023, 3, 12, 16, 50).toISOString(),
    },
    {
      name: "Harvest Season Strategies",
      someid: "1c5b76d0-75e2-491b-afde-20e130446ac5",
      creationDate: new Date(2023, 3, 13, 17, 55).toISOString(),
    },
  ];
  return (
    <>
      {data?.length > 0 &&
        data?.map((eachChat: any, index: number) => {
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
        })}
    </>
  );
};

export default ChatSessions;
