"use client";
import React, { ReactElement, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// import CountryStateSelector from "../generic/CountryStateSelector";
import SettingsDialog from "./SettingsModal";

// Import or define LanguageSelector and CropSelector components

interface CatSubcatResponse {
  [key: string]: string[];
}

const SettingsModal = ({
  isOpen,
  handleClose,
  renderComponent,
  states,
  allCategories,
}: {
  isOpen: boolean;
  handleClose?: () => void;
  renderComponent?: () => ReactElement;
  states?: string[];
  allCategories?: CatSubcatResponse;
}) => {
  const [activeTab, setActiveTab] = useState("country");

  //   const renderContent = () => {
  //     switch (activeTab) {
  //       case "country":
  //         return <CountryStateSelector />;
  //       case "language":
  //         // Return LanguageSelector component
  //         return <></>;
  //       case "crop":
  //         // Return CropSelector component
  //         return <></>;
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Adjust min-w-[50%] to be responsive and h-1/2 for smaller screens */}
      <DialogContent className="dark:bg-gray-800 bg-white w-fit max-w-lg mx-auto p-4 md:min-w-[50%] h-fit min-h-fit  dark:text-white text-gray-900 rounded-lg">
        <DialogHeader className="text-gray-900 dark:text-white h-fit">
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>Configure your preferences.</DialogDescription>
        </DialogHeader>

        {/* Conditional rendering based on passed renderComponent */}
        {renderComponent ? (
          renderComponent()
        ) : (
          <SettingsDialog
            isOpen={isOpen}
            handleClose={handleClose}
            states={states}
            allCategories={allCategories}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
