"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SettingsDialog = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [activeSection, setActiveSection] = useState("countryCustomization");

  const renderSection = () => {
    switch (activeSection) {
      case "clearChat":
        return (
          <div className="text-center">
            <button
              onClick={() => console.log("Clearing chat...")}
              className="bg-red-500 hover:bg-red-700 text-white dark:text-white font-bold py-2 px-4 rounded transition-colors duration-150"
            >
              Clear Chat
            </button>
          </div>
        );
      case "changeFont":
        return <div>Font Options will be here.</div>;
      case "sendChat":
        return (
          <div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
              />
              <Button
                onClick={() => console.log("Sending chat...")}
                className="bg-black-500 hover:bg-black-700 text-white dark:text-white font-bold py-2 px-4 rounded transition-colors duration-150"
              >
                Send Chat
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Select an option from the left.</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-full">
      <div className="w-full md:w-1/3 lg:w-1/4 p-5 overflow-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150"
            onClick={() => setActiveSection("clearChat")}
          >
            Clear Chat
          </li>
          <li
            className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150"
            onClick={() => setActiveSection("changeFont")}
          >
            Change Font
          </li>
          <li
            className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150"
            onClick={() => setActiveSection("sendChat")}
          >
            Send Chat
          </li>
        </ul>
      </div>
      <div className="flex-grow p-5 min-h-[250px] bg-white dark:bg-gray-900">
        {renderSection()}
      </div>
    </div>
  );
};

export default SettingsDialog;
