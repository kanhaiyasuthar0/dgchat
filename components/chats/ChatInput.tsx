"use client";
// components/ChatInput.js
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Paperclip, Upload } from "lucide-react";
import ChatGptLikeInput from "./ChatGptLikeInput";

interface MyComponentProps {
  getResponse: (str1: string, str2?: Blob) => void;
  // include other props as needed
}

const ChatInput: React.FC<MyComponentProps> = ({
  getResponse,
}: {
  getResponse: (string: string, strin2?: Blob) => void;
}) => {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e, "e12");
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText(""); // Clear input field
    getResponse(inputText);
  };

  return (
    <form onSubmit={handleSendMessage} className="mt-4">
      {/* <div className="flex items-center">
        <>
          <input type="file" style={{ display: "none" }} />

          <button
            type="button"
            className="p-3 outline-none border-collapse rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <Paperclip size={"20"} />
          </button>
        </>
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          // className="bg-transparent focus:ring-0 focus:border-none border-0 focus:outline-none disabled:opacity-100 disabled:bg-transparent"

          className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
        />
      </div> */}
      <ChatGptLikeInput getResponse={getResponse} />
    </form>
  );
};

export default ChatInput;
