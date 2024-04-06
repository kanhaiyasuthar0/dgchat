"use client";
// components/ChatInput.js
import React, { useState } from "react";

const ChatInput = ({
  getResponse,
}: {
  getResponse: (string: string) => void;
}) => {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText(""); // Clear input field
    getResponse(inputText);
  };

  return (
    <form onSubmit={handleSendMessage} className="mt-4">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
      />
    </form>
  );
};

export default ChatInput;
