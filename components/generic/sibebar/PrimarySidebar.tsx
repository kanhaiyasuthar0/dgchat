import React from "react";
import SidebarContent from "../SidebarContent";
import ThemeCustomization from "../ThemeChanger";

const PrimarySidebar = () => {
  return (
    <div
      className={`transform ${
        false ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 z-30`}
    >
      {/* <ButtonForSidebarToggle
          isSidebarOpen={isSidebarOpen}
          // toggleSidebar={() => <></>}
        /> */}
      {/* Sidebar content */}
      {/* <div className="flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out z-30"> */}
      {/* Toggler for smaller screens */}
      <div className="absolute top-4 right-0 m-4 lg:hidden block">
        <ThemeCustomization />
      </div>
      <SidebarContent />

      {/* </div> */}
    </div>
  );
};

export default PrimarySidebar;
