"use client";
import { MessageSquareShare } from "lucide-react";
import React, { useEffect, useState } from "react";
import CompleteMapChat from "./CompleteMapChat";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const ChatSessions = () => {
  const [data, setData] = useState([]);
  //   const data = [
  //     {
  //       name: "Spring Planting Queries",
  //       someid: "4f5a2c17-a687-4e4c-9d3b-93c8f64f1db4",
  //       creationDate: new Date(2023, 3, 10, 14, 30).toISOString(),
  //     },
  //     {
  //       name: "Irrigation Solutions Discussion",
  //       someid: "be98e057-ca0d-4f5b-8b0e-688a95c7e65b",
  //       creationDate: new Date(2023, 3, 11, 15, 45).toISOString(),
  //     },
  //     {
  //       name: "Organic Farming Tips",
  //       someid: "e4b99ad3-d403-4fb7-a2ab-6f734d73d6b7",
  //       creationDate: new Date(2023, 3, 12, 16, 50).toISOString(),
  //     },
  //     {
  //       name: "Harvest Season Strategies",
  //       someid: "1c5b76d0-75e2-491b-afde-20e130446ac5",
  //       creationDate: new Date(2023, 3, 13, 17, 55).toISOString(),
  //     },
  //   ];
  //   throw new Error("some");

  async function getData() {
    console.log(
      process.env.NEXT_PUBLIC_DEPLOYED_URL,
      "process.env.DEPLOYED_URL"
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/api/chatsession/`,
      {
        method: "GET",
        next: {
          tags: ["chatsessions"],
        },
        cache: "no-cache",
      }
    );
    const { chatSessions: data } = await response.json();
    console.log("🚀 ~ SidebarContentsessions ~ data:", data);

    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <CompleteMapChat data={data} />
    </>
  );
};

export default ChatSessions;
