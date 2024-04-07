import { auth } from "@/auth";
import MainChatPage from "@/components/chats/MainChatPage";
import { redirect } from "next/navigation";

import React from "react";

const ChatPage = async () => {
  const data = await auth();
  if (!data?.user) {
    console.log("🚀 ~ ChatPage ~ data:", data?.user);
    redirect("/");
  }

  return <MainChatPage />;
};

export default ChatPage;
