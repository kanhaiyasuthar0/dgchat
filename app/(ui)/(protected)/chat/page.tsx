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

const ChatPage = async () => {
  // const data = await auth();
  // if (!data?.user) {
  //   console.log("🚀 ~ ChatPage ~ data:", data?.user);
  //   redirect("/");
  // }

  return <MainChatPage />;
};

export default ChatPage;
