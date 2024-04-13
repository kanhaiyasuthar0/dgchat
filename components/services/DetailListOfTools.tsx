"use client";
import { addChatSession } from "@/utils/common";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import NoResultsFound from "../generic/nosearch/NoSearchFound";
import { revalidateTag } from "next/cache";
import {
  agenciesObject,
  valuesreoriginalcorrespondingtoimport,
} from "@/data/image";
const DetailListOfTools = ({ tools, heading, type, query }: any) => {
  const router = useRouter();
  const agricultureServices = [];

  const addNewChat = async (name: string, id: string, allData: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/api/chatsession`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          someid: id,
          allData: allData,
        }),
        // headers: {
        //   "Content-Type": "application/json", // Ensure to set the Content-Type header
        // },
      }
    );
    const data = await response.json();
    console.log("🚀 ~ addNewChat1 ~ data:", data);
  };

  const handleTool = (name: string, id: string, allData: any) => {
    console.log(name, id);
    addNewChat(name, id, allData);
    // revalidateTag("chatsessions");
    router.push(`/chat?id=${id}`);
  };
  const imageIds = [
    "photo-1462690417829-5b41247f6b0e", // Image ID 1
    "photo-1615915468538-0fbd857888ca", // Image ID 2
    "photo-1615915468538-0fbd857888ca", // Image ID 3 (example added)
    "photo-1462690417829-5b41247f6b0e", // Image ID 4 (example added)
  ];

  const getImageUrl = (index: number) => {
    const id = imageIds[index % imageIds.length]; // Use modulo to cycle through the array
    return `https://images.unsplash.com/${id}`;
  };

  interface CategoryType {
    Category: string;
    Subcategory: string;
    Name: string;
    Address: string;
    Description: string;
    Offering: string;
    "# Of Subscribers": number;
    "# Of Queries": number;
    "# Of Ratings": string;
  }

  const results = tools?.filter((tool: CategoryType) => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedHeading = heading?.trim().toLowerCase();
    return (
      tool.Category.toLowerCase() === normalizedHeading &&
      tool.Name.toLowerCase().includes(normalizedQuery)
    );
  });

  if (results.length === 0) {
    return <NoResultsFound query={query} />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {results?.map((tool: any, index: number) => {
        // Normalize the input and content to lowercase for case-insensitive comparison
        return (
          <div
            key={tool.Name} // Use Name for the key
            onClick={() => handleTool(tool?.Name, uuidv4(), tool)}
            style={{ cursor: "pointer" }}
            className="min-h-full "
          >
            <div className="bg-white dark:bg-gray-800 h-full flex gap-3 shadow-md rounded-lg p-4 hover:bg-gray-300 ">
              <div
                className={`relative bg-gray-100w-20 h-20 min-w-20 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center shadow-xl ${
                  valuesreoriginalcorrespondingtoimport[`${tool.Name}`]
                    ? ""
                    : "bg-gray-300"
                }`}
              >
                {valuesreoriginalcorrespondingtoimport[`${tool.Name}`] ? (
                  <Image
                    src={valuesreoriginalcorrespondingtoimport[`${tool.Name}`]}
                    alt={`${tool.Name} logo`}
                    width={100}
                    height={100}
                    className="object-contain w-full max-w-[200px] h-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-white uppercase">
                    {tool.Name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {tool.Name}
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {tool.Description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>By: {tool.Name}</span>{" "}
                  {/* Display the name as the creator */}
                  <span>Likes: {tool["# Of Queries"]}</span>
                  <span>Dislikes: {tool["# Of Ratings"]}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailListOfTools;
