import React, { Suspense, useEffect, useState } from "react";
import CountryStateSelector from "../generic/CountryStateSelector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StateCategorySubCategory from "./StateCategorySubCategory";

interface YourComponentProps {
  isOpen?: boolean;
  handleClose: () => void;
  states?: any;
  categories?: { key: string[] };
}

const SettingsDialog: React.FC<YourComponentProps> = ({
  isOpen,
  handleClose,
  states,
}) => {
  const [activeSection, setActiveSection] =
    useState<string>("stateCropSelection");

  const renderSection = () => {
    switch (activeSection) {
      case "stateCropSelection":
        return <StateCategorySubCategory states={states} />;
      case "accountPreferences":
        return <AccountPreferences handleClose={handleClose} />;
      case "cropPreferences":
        return <CropSelection handleClose={handleClose} />;
      // case "themeCustomization":
      //   return <ThemeCustomization handleClose={handleClose} />;
      case "countryCustomization":
        return <CountryCustomization handleClose={handleClose} />;
      default:
        return <AccountPreferences isOpen={isOpen} handleClose={handleClose} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-full">
      <div className="w-full md:w-1/3 lg:w-1/4 p-5 overflow-auto bg-gray-50 dark:bg-gray-800">
        {/* Sidebar with options... */}
        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("stateCropSelection")}
          >
            Crop Preferences
          </li>
          <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("countryCustomization")}
          >
            Country Preferences
          </li>
          {/* <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("cropPreferences")}
          >
            Crop Settings
          </li> */}
          <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("accountPreferences")}
          >
            Account Preferences
          </li>
          {/* Commented out Notification Settings for future use */}
          {/* <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("themeCustomization")}
          >
            Theme
          </li> */}
        </ul>
      </div>
      <div className="flex-grow p-5 min-h-[250px] bg-white dark:bg-gray-900">
        {/* Active section content... */}
        {renderSection()}
      </div>
    </div>
  );
};

const AccountPreferences: React.FC<YourComponentProps> = ({
  handleClose,
}: {
  handleClose: () => void;
}) => (
  <section className="space-y-4">
    <div>
      <label
        htmlFor="language-select"
        className="block text-sm font-medium dark:text-white text-gray-900"
      >
        Language
      </label>
      <select
        id="language-select"
        className="mt-1 block w-full p-2 dark:bg-gray-700 bg-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none dark:focus:ring-blue-500 focus:ring-blue-300 dark:focus:border-blue-500 focus:border-blue-300"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add more options as needed */}
      </select>
    </div>
    <div>
      <label
        htmlFor="timezone-select"
        className="block text-sm font-medium dark:text-white text-gray-900"
      >
        Time Zone
      </label>
      <select
        id="timezone-select"
        className="mt-1 block w-full p-2 dark:bg-gray-700 bg-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none dark:focus:ring-blue-500 focus:ring-blue-300 dark:focus:border-blue-500 focus:border-blue-300"
      >
        <option value="UTC-5">Eastern Time</option>
        <option value="UTC-8">Pacific Time</option>
        {/* Add more options as needed */}
      </select>
    </div>
  </section>
);

// interface YourComponentProps {
//   handleChange: (selectedCrop: string) => void;
// }

const CropSelection: React.FC<YourComponentProps> = () => {
  // const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedCrop, setSelectedCrop] = useState("");
  const handleChange = (selectedCrop: string) => {
    const params = new URLSearchParams(window.location.search);
    if (selectedCrop) {
      params.set("crop", selectedCrop);
    } else {
      params.delete("crop");
    }
    replace(`${pathname}?${params.toString()}`);
    // Additional logic here
  };

  const crops = [
    "Wheat",
    "Rice",
    "Corn",
    "Barley",
    "Soybeans",
    "Oats",
    "Rye",
    "Millet",
    "Sorghum",
    "Canola",
    "Quinoa",
    "Amaranth",
    "Buckwheat",
    "Sunflower",
    "Flaxseed",
    "Chia",
    "Cotton",
  ];

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setSelectedCrop(newValue);
    handleChange(newValue);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col">
        <label
          htmlFor="crop-selection"
          className="block text-sm font-medium dark:text-white text-gray-900 mb-2"
        >
          Select Crop
        </label>
        <select
          id="crop-selection"
          value={selectedCrop}
          onChange={handleSelectionChange}
          className="w-full p-2 dark:bg-gray-700 bg-gray-300 border-gray-600 rounded focus:ring-blue-500 dark:text-white text-gray-900"
        >
          <option value="">Select a crop...</option>
          {crops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

// export default CropSelection;

const NotificationSettings: React.FC<YourComponentProps> = ({
  handleClose,
}: {
  handleClose: () => void;
}) => (
  <section className="space-y-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="email-notifications"
        className="w-4 h-4 text-blue-600 dark:bg-gray-700 bg-gray-300 border-gray-600 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="email-notifications"
        className="ml-2 block text-sm font-medium dark:text-white text-gray-900"
      >
        Email Notifications
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="sms-notifications"
        className="w-4 h-4 text-blue-600 dark:bg-gray-700 bg-gray-300 border-gray-600 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="sms-notifications"
        className="ml-2 block text-sm font-medium dark:text-white text-gray-900"
      >
        SMS Notifications
      </label>
    </div>
  </section>
);

const CountryCustomization: React.FC<YourComponentProps> = ({
  handleClose,
}: {
  handleClose: () => void;
}) => (
  <section className="space-y-4">
    {/* <h2 className="text-lg font-semibold">Theme</h2> */}
    <Suspense>
      <CountryStateSelector handleClose={handleClose} />
    </Suspense>
  </section>
);

export default SettingsDialog;
