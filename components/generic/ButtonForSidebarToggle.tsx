// ButtonForSidebarToggle.js
import { CircleX, CrossIcon } from "lucide-react";
import React from "react";

const ButtonForSidebarToggle = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <button
      onClick={toggleSidebar}
      className="lg:hidden mb-4 text-gray-600 dark:text-gray-300"
      aria-controls="sidebar"
      aria-expanded="false"
    >
      {isSidebarOpen ? <CircleX /> : "Menu"}
    </button>
  );
};

export default ButtonForSidebarToggle;
