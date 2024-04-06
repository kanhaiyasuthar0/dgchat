"use client";
// components/ChatContainer.js
import React, { useState, useRef, useEffect } from "react";
import ResponseFormatter from "./ResponseFormatter";
import ChatInput from "./ChatInput"; // Component for the input area
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AssistComponent from "../generic/AssisComponent";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

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
const ChatContainer = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const searchParams = useSearchParams();
  const [chatExchanges, setChatExchanges] = useState<IChatExchange[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function getResponse(inputText: string) {
    // console.log(crop, language, bot, " crop, language, bot");
    const newExchange: IChatExchange = {
      id: chatExchanges.length + 1,
      query: inputText,
      loading: true, // Initially set to loading
    };

    setChatExchanges([...chatExchanges, newExchange]);
    // Define the shape of filters with an index signature
    interface Filters {
      [key: string]: string | undefined; // This allows any string as a key, and string as a value
    }
    const payload: {
      query: string;
      email_id: string | null;
      chain: boolean;
      filters: Filters;
    } = {
      query: inputText,
      email_id: localStorage.getItem("userId"),
      chain: true,
      filters: {},
    };

    const crop = searchParams.get("crop");
    const state = searchParams.get("state");

    // Conditionally add `sub_category` if `crop` is defined and not empty
    if (crop) {
      payload.filters["sub_category"] = crop;
    }

    // Conditionally add `state` if `state` is defined and not empty
    // if (state) {
    //   payload.filters["state"] = state;
    // }

    try {
      const response = await axios.post(
        `${"https://sandbox.farmstack.digitalgreen.org"}/ai/chat/chat_api/`,
        payload
      );
      console.log("🚀 ~ getResponse ~ response:", response);

      // Update the latest exchange with the response
      setChatExchanges((currentExchanges) => {
        // Make a shallow copy of the array to ensure immutability
        const updatedExchanges = [...currentExchanges];
        // Check if there are any exchanges and update the last one
        if (updatedExchanges.length > 0) {
          const lastExchange = updatedExchanges.at(-1)!;
          updatedExchanges[updatedExchanges.length - 1] = {
            ...lastExchange,
            response: response?.data.output,
            loading: false,
          };
        }
        return updatedExchanges;
      });
    } catch (error) {
      setTimeout(() => {
        setChatExchanges((currentExchanges) => {
          // Make a shallow copy of the array to ensure immutability
          const updatedExchanges = [...currentExchanges];
          // Check if there are any exchanges and update the last one
          if (updatedExchanges.length > 0) {
            const lastExchange = updatedExchanges.at(-1)!;
            updatedExchanges[updatedExchanges.length - 1] = {
              ...lastExchange,
              response: {
                youtube_url: "",
                query_response: "SOMETHING WENT WRONG",
                condensed_question: "What can you tell me about wheat blast?",
                follow_up_questions: [],
                query: "Tell me about wheat blast",
              },
              loading: false,
            };
          }
          // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          return updatedExchanges;
        });
      }, 3000);
      console.error("Error sending message:", error);
      // Optionally handle error state here
    }
  }

  setTimeout(() => {
    if (bottomRef && bottomRef?.current) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, 0);
  return (
    <div className="flex flex-col h-full dark:bg-gray-900 bg-gray-100 p-4">
      <div className="flex-1 overflow-auto">
        {chatExchanges.length > 0 ? (
          chatExchanges.map((exchange) => (
            <div
              key={exchange.id}
              className="w-full py-2 my-2 dark:text-white text-gray-800"
            >
              {/* User query */}
              <div className="text-left">
                <div className="flex gap-5 items-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-lg px-4 py-2 shadow">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.image ?? ""} alt="Avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {exchange.query}
                </div>
              </div>
              {/* Bot response */}
              {exchange?.loading ? (
                <div className="text-left mt-2">
                  <div className="flex gap-5 items-center bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg px-4 py-2 shadow animate-pulse">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Bot Avatar"
                      />
                      <AvatarFallback>FC</AvatarFallback>
                    </Avatar>
                    Replying...
                  </div>
                </div>
              ) : (
                <>
                  <ResponseFormatter
                    exchange={exchange.response}
                    getResponse={getResponse}
                  />
                </>
              )}
            </div>
          ))
        ) : (
          <AssistComponent />
        )}
        <div ref={bottomRef}></div>
      </div>
      <ChatInput getResponse={getResponse} />
    </div>
  );
};

export default ChatContainer;
