"use client";
import React, { Suspense, useState } from "react";
import ChatContainer from "./ChatContainer";
import SettingsModal from "./Options";
// import SettingsModal from "./Options";

const MainChat = () => {
  const [showModal, setShowModal] = useState(false);
  // Placeholder for handling option selection from the modal
  const handleOptionSelect = (option: any) => {
    console.log(option);
    setShowModal(false);
  };

  return (
    <div className="relative flex h-full bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Options button and modal trigger, positioned absolutely */}
      <div className="absolute top-0 left-0 z-10">
        <button
          onClick={() => setShowModal(true)}
          className="m-4 text-black dark:text-white bg-gray-300 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-4 rounded"
        >
          Options
        </button>
        <Suspense fallback={"Loading..."}>
          <SettingsModal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
          />
        </Suspense>
      </div>

      {/* Main chat window, taking the full height and centered */}
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="w-full max-w-4xl h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          {/* Chat messages display area */}
          <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-900">
            <Suspense fallback={"Loading..."}>
              <ChatContainer />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
