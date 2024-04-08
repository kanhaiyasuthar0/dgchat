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

const SettingsModal = ({
  isOpen,
  handleClose,
  renderComponent,
  states,
}: {
  isOpen: boolean;
  handleClose: () => void;
  renderComponent?: () => ReactElement;
  states?: string[];
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
      <DialogContent className="dark:bg-gray-800 h-fit bg-white w-full max-w-lg mx-auto p-4 md:min-w-[50%] h-auto md:h-1/2 dark:text-white text-gray-900 rounded-lg">
        <DialogHeader className="text-gray-900 dark:text-white">
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
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
