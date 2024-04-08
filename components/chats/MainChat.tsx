"use client";
import React, { Suspense, useState } from "react";
import ChatContainer from "./ChatContainer";
import SettingsModal from "./Options";
import ButtonForSidebarToggle from "../generic/ButtonForSidebarToggle";
import { ListFilter } from "lucide-react";
import StateCategorySubCategory from "./StateCategorySubCategory";
import ThemeCustomization from "../generic/ThemeChanger";
// import SettingsModal from "./Options";

const MainChat = ({
  toggleSidebar,
  isSidebarOpen,
  states,
  history,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  states: string[];
  history: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  // Placeholder for handling option selection from the modal
  const handleOptionSelect = (option: any) => {
    console.log(option);
    setShowModal(false);
  };

  // const states = ["State 1", "State 2", "State 3"]; // Example states
  const categories = {
    "Category 1": ["Subcategory 1", "Subcategory 2"],
    "Category 2": ["Subcategory 3", "Subcategory 4"],
    // Populate dynamically based on selected state
  };

  return (
    <div className="relative flex h-full bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Options button and modal trigger, positioned absolutely */}
      <div className="absolute top-0 lg:left-0 right-0 w-full flex justify-between z-10">
        <ButtonForSidebarToggle
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* <Suspense fallback={"Loading..."}>
          
        </Suspense> */}

        <button
          onClick={() => setShowModal(true)}
          className="m-4 text-black dark:text-white flex gap-1 items-center bg-gray-300 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-4 rounded"
        >
          <span className="lg:block hidden">Options</span>
          <ListFilter size={"15"} />
        </button>

        <div className="absolute right-0 m-4 lg:block hidden">
          <ThemeCustomization />
        </div>

        <Suspense fallback={"Loading..."}>
          <SettingsModal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
            states={states}
          />
        </Suspense>
      </div>

      {/* Main chat window, taking the full height and centered */}
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="w-full max-w-4xl h-full flex flex-col bg-gray-100 dark:bg-gray-800">
          {/* Chat messages display area */}
          <div className="flex-1 overflow-auto lg:p-2 p-0 bg-white dark:bg-gray-900">
            <Suspense fallback={"Loading..."}>
              <ChatContainer history={history} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
