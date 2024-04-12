"use client";
import SettingsModal from "@/components/chats/Options";
import SettingsDialog from "@/components/chats/SettingsModal";
import React, { useState } from "react";
import ThemeCustomization from "../ThemeChanger";
import { ListFilter } from "lucide-react";

const PrimayModal = () => {
  // states?: any;
  // categories?: { key: string[] };
  // allCategories?: CatSubcatResponse;

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <SettingsModal isOpen={isOpen} handleClose={handleClose} />

      <button
        onClick={() => setIsOpen(true)}
        className="p-2 py-3 transition duration-500 ease-in-out rounded-full text-gray-300 bg-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 m-4 absolute right-10 lg:flex hidden  gap-1 items-center  dark:bg-gray-600"
      >
        {/* <span className="lg:block hidden">Options</span> */}
        <ListFilter size={"15"} className="" />
      </button>
      {/* {type == "theme" && <Setting />} */}
    </div>
  );
};

export default PrimayModal;
