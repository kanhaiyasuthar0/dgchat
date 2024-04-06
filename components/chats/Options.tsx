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
}: {
  isOpen: boolean;
  handleClose: () => void;
  renderComponent?: () => ReactElement;
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
      <DialogContent className="dark:bg-gray-800 bg-white min-w-[50%] dark:text-white text-gray-900 h-1/2">
        <DialogHeader className="text-gray-900 dark:text-white">
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>Configure your preferences.</DialogDescription>
        </DialogHeader>
        {/* Layout adjustment for side-by-side display with theme compatibility */}

        {renderComponent ? (
          renderComponent()
        ) : (
          <SettingsDialog isOpen={isOpen} handleClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;