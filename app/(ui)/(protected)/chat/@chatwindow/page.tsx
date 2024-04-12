import { auth } from "@/auth";
import MainChat from "@/components/chats/MainChat";
import React from "react";

const ChatWindow = async ({ searchParams }: any) => {
  //   console.log("🚀 ~ ChatWindow ~ params:", params);
  return <MainChat activeBot={searchParams?.service} />;
};

export default ChatWindow;
