// "use client";
import React, { Suspense, useState } from "react";
import ChatContainer from "./ChatContainer";
import SettingsModal from "./Options";
import ButtonForSidebarToggle from "../generic/ButtonForSidebarToggle";
import { ListFilter } from "lucide-react";
import StateCategorySubCategory from "./StateCategorySubCategory";
import ThemeCustomization from "../generic/ThemeChanger";
import { ChatContextProvider } from "./ChatContext";
import { CommandDialogDemo } from "../generic/ContextMenu";
import ChatContainerWrapper from "./ChatContainerWrapper";
import { PuffLoader } from "react-spinners";
import PrimayModal from "../generic/modal/PrimayModal";
// import SettingsModal from "./Options";

interface CatSubcatResponse {
  [key: string]: string[];
}
const MainChat = ({
  activeBot,
}: {
  // allCategories: CatSubcatResponse;
  activeBot?: string;
  showModal?: boolean;
  setShowModal?: (string: any) => void;
  isSidebarOpen?: boolean;
  toggleSidebar?: (string: any) => void;
  states?: any;
  history?: any;
  allCategories?: any;
}) => {
  // console.log("🚀 ~ params:", params);
  // Placeholder for handling option selection from the modal
  const handleOptionSelect = (option: any) => {
    console.log(option);
    // setShowModal(false);
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
        // isSidebarOpen={isSidebarOpen}
        // toggleSidebar={() => ""}
        />

        {/* <Suspense fallback={"Loading..."}>
          
        </Suspense> */}
        <div className="space-y-4">
          <PrimayModal />
        </div>

        {/* <div className="absolute left-0 m-4 lg:block hidden">
          <button className="max-w-[200px] truncate text-wrap">
            {activeBot}
          </button>
        </div> */}
        <div className="absolute right-0 m-4 lg:block hidden">
          <ThemeCustomization />
        </div>
        <div className="hidden p-2 py-3 transition duration-500 ease-in-out rounded-full text-gray-300 bg-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 m-4 absolute right-0 top-12 gap-1 items-center  dark:bg-gray-600">
          <CommandDialogDemo />
        </div>

        {/* <Suspense fallback={"Loading..."}> */}
        {/* <SettingsModal
          // isOpen={showModal}
          // handleClose={() => ""}
          // states={states}
          allCategories={{}}
        /> */}
        {/* </Suspense> */}
      </div>

      {/* Main chat window, taking the full height and centered */}
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="w-full max-w-4xl h-full flex flex-col bg-gray-100 dark:bg-gray-800">
          {/* Chat messages display area */}
          <div className="flex-1 overflow-auto lg:p-2 p-0 bg-white dark:bg-gray-900">
            <Suspense
              fallback={
                <div className="flex justify-center items-center min-h-screen">
                  <PuffLoader loading color="black" />
                </div>
              }
            >
              <ChatContainerWrapper />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
