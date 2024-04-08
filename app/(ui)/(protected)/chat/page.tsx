import { auth } from "@/auth";
import MainChatPage from "@/components/chats/MainChatPage";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import React from "react";

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
    title: `${data?.user.name} | FarmChat by Digital Green: Empowering Farmers Through Conversation`,
    description:
      "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
    openGraph: {
      type: "website",
      url: process.env.NEXTAUTH_URL,
      title: `${data?.user.name} | FarmChat by Digital Green: Empowering Farmers Through Conversation`,
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
const ChatPage = async () => {
  const data = await auth();
  // const data = await auth();
  // if (!data?.user) {
  //   console.log("🚀 ~ ChatPage ~ data:", data?.user);
  //   redirect("/");
  // }

  // fetch all the states as per the country default is INDIA
  async function fetchStates(): Promise<string[]> {
    try {
      const response = await fetch(
        "https://sandbox.farmstack.digitalgreen.org/ai/chat/state/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const states: string[] = await response.json();
      return states;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }
  async function fetchChatHistory(): Promise<string[]> {
    console.log(data?.user);
    try {
      const response = await fetch(
        "https://sandbox.farmstack.digitalgreen.org/ai/chat/chat_history/",
        {
          method: "POST",
          body: JSON.stringify({
            email_id: data?.user?.databaseId,
          }),
          headers: {
            "Content-Type": "application/json", // This header tells the server to expect JSON
          },
        }
      );
      // console.log(response, "response123");
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const history: string[] = await response.json();
      return history;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }

  const allStates = await fetchStates();
  const allChatHistory: any = await fetchChatHistory();

  function updateKeyInObjects(
    array: Array<Record<string, any>>,
    oldKey: string,
    newKey: string
  ) {
    return array.map((obj) => {
      if (obj.hasOwnProperty(oldKey)) {
        // Create a new object with all properties of the original object
        const newObj = { ...obj };
        // Add the new key with the value of the old key
        newObj[newKey] = newObj[oldKey];
        // Delete the old key
        delete newObj[oldKey];
        return newObj;
      }
      return obj;
    });
  }

  const updatedChatHistory = updateKeyInObjects(
    allChatHistory,
    "output",
    "response"
  );
  // const historyObj: IChatExchange = {
  //   id: allChatHistory[0]?.id,
  //   query: allChatHistory[0].query,
  //   response: allChatHistory[0].output, // Optional since the response will be populated later
  // };
  // console.log("🚀 ~ ChatPage ~ historyObj:", historyObj);
  // console.log("🚀 ~ ChatPage ~ allChatHistory:", allChatHistory);
  // console.log("🚀 ~ ChatPage ~ allStates:", allStates);

  // const allCrops = await fetchCatAndSubcat()

  return <MainChatPage states={allStates} history={updatedChatHistory} />;
};

export default ChatPage;
