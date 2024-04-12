"use client";
import { addChatSession } from "@/utils/common";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";
const DetailListOfTools = ({ tools, heading }: any) => {
  const router = useRouter();
  const agricultureServices = [];

  const handleTool = (name: string, id: string) => {
    console.log(name, id);
    addChatSession(name, id);
    router.push(`/chat?id=${id}`);
  };
  return (
    // {Object.entries(agricultureServices).map(([category, { tools }]) => (
    //     <div key={category} className="mb-10">
    //       {/* <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
    //         {category
    //           .replaceAll("Management", "")
    //           .replaceAll("Innovation", "")
    //           .trim()}
    //       </h3> */}
    //     </div>
    //   ))}

    <div className="grid md:grid-cols-2 border gap-4">
      {tools?.map((tool: any) => (
        <div
          key={tool.name}
          //   href={`/chat?tool=${tool.name}`}
          onClick={() => handleTool(tool.name, uuidv4())}
        >
          <div className="bg-white dark:hover:bg-gray-500 cursor-pointer   flex gap-3 dark:bg-gray-800 shadow-md rounded-lg p-4">
            <Image
              width={400}
              height={400}
              src={tool.service_logo}
              alt={`${tool.name} logo`}
              className="w-auto min-w-20 h-20 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col">
              <div className="font-bold dark:text-white text-gray-900">
                {tool.service_name}
                <p className="text-xs dark:text-gray-400 text-gray-600">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 flex justify-between text-xs dark:text-gray-400 text-gray-600">
                <span>By: {tool.name}</span>
                {/* <span>Dislikes: {tool.no_of_dislikes}</span> */}
              </div>
              <div className="mt-4 flex justify-between text-xs dark:text-gray-400 text-gray-600">
                <span>Likes: {tool.no_of_likes}</span>
                <span>Dislikes: {tool.no_of_dislikes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailListOfTools;
