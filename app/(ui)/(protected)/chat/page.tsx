import { auth } from "@/auth";
import MainChat from "@/components/chats/MainChat";
import MainChatPage from "@/components/chats/MainChatPage";
import PrimarySidebar from "@/components/generic/sibebar/PrimarySidebar";
import { Metadata, ResolvingMetadata } from "next";
import { redirect, useSearchParams } from "next/navigation";

import React from "react";
export const dynamic = "force-dynamic";
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await auth();
  const previousImages = (await parent).openGraph?.images || [];
  console.log(
    `${process.env.NEXTAUTH_URL}/opengraph-farmchat.png`,
    "inside metdata"
  );
  return {
    title: `FarmChat by Digital Green: Empowering Farmers Through Conversation`,
    description:
      "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
    openGraph: {
      type: "website",
      url: process.env.NEXTAUTH_URL,
      title: `FarmChat by Digital Green: Empowering Farmers Through Conversation`,
      description:
        "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
      siteName: "FarmChat by Digital Green",
      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/opengraph-farmchat.png`, // Replace '/opengraph-farmchat.jpg' with the path to your Open Graph image
          width: 1200,
          height: 630,
          alt: "FarmChat by Digital Green - Empowering Farmers Through Conversation",
        },
        // If you have more images, you can add them here
      ],
    },
  };
}
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
const ChatPage = async ({
  searchParams,
}: {
  searchParams: { service?: string; id?: string };
}) => {
  console.log("🚀 ~ searchParams:", searchParams);

  // const response = await fetch(
  //   `https://farmerchat.vercel.app/api/chatsessions`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: searchParams.service,
  //       someid: searchParams.id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json", // Ensure to set the Content-Type header
  //     },
  //   }
  // );
  // console.log("🚀 ~ response:912", response);

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

  // console.log("🚀 ~ data:123412", data);
  // console.log("🚀 ~ ChatPage ~ searchParams:", searchParams);
  // console.log("🚀 ~ ChatPage ~ params:", params);
  // const data = await auth();
  // const selectedState = searchParams["state"] || null;
  // const searchParams = useSearchParams();
  // console.log("on server123", searchParams?.get("crop"));
  // const data = await auth();
  // if (!data?.user) {
  //   console.log("🚀 ~ ChatPage ~ data:", data?.user);
  //   redirect("/");
  // }

  // fetch all the states as per the country default is INDIA
  // async function fetchStates(): Promise<string[]> {
  //   try {
  //     const response = await fetch(
  //       "https://sandbox.farmstack.digitalgreen.org/ai/chat/state/"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const states: string[] = await response.json();
  //     return states;
  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //     return [];
  //   }
  // }
  // async function fetchChatHistory(): Promise<string[]> {
  //   console.log(data?.user);
  //   try {
  //     const response = await fetch(
  //       "https://sandbox.farmstack.digitalgreen.org/ai/chat/chat_history/",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           email_id: data?.user?.databaseId,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json", // This header tells the server to expect JSON
  //         },
  //       }
  //     );
  //     // console.log(response, "response123");
  //     // if (!response.ok) {
  //     //   throw new Error("Network response was not ok");
  //     // }
  //     const history: string[] = await response.json();
  //     return history;
  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //     return [];
  //   }
  // }

  // interface CatSubcatResponse {
  //   [key: string]: string[];
  // }

  // async function fetchCatAndSubcat(
  //   selectedState: string
  // ): Promise<CatSubcatResponse> {
  //   try {
  //     const response = await fetch(
  //       `https://sandbox.farmstack.digitalgreen.org/ai/chat/cat_and_subcat/?state=${selectedState}`,
  //       {
  //         method: "GET", // Change to 'GET' if your API expects a GET request.
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // If it's actually a POST request and requires a body, uncomment the following line:
  //         // body: JSON.stringify({ state: selectedState }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data: CatSubcatResponse = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching categories and subcategories:", error);
  //     return {};
  //   }
  // }

  // const allStates = [];
  // const allStates = await fetchStates();
  // let allCategories = {};

  //get all list of crops
  // if (selectedState) {
  //   const response = await fetchCatAndSubcat(selectedState);
  //   // console.log("🚀 ~ ChatPage ~ response:", response);
  //   allCategories = { ...response };
  // }

  // const allChatHistory: any = await fetchChatHistory();

  // function updateKeyInObjects(
  //   array: Array<Record<string, any>>,
  //   oldKey: string,
  //   newKey: string
  // ) {
  //   return array.map((obj) => {
  //     if (obj.hasOwnProperty(oldKey)) {
  //       // Create a new object with all properties of the original object
  //       const newObj = { ...obj };
  //       // Add the new key with the value of the old key
  //       newObj[newKey] = newObj[oldKey];
  //       // Delete the old key
  //       delete newObj[oldKey];
  //       return newObj;
  //     }
  //     return obj;
  //   });
  // }

  // const updatedChatHistory = updateKeyInObjects(
  //   allChatHistory,
  //   "output",
  //   "response"
  // );

  return <></>;
};

export default ChatPage;
