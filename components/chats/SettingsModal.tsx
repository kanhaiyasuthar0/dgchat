import React, { Suspense, useEffect, useState } from "react";
import CountryStateSelector from "../generic/CountryStateSelector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StateCategorySubCategory from "./StateCategorySubCategory";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Location from "../profile/Location";
import CountryState from "../profile/CountryState";
interface CatSubcatResponse {
  [key: string]: string[];
}
interface YourComponentProps {
  isOpen?: boolean;
  handleClose?: () => void;
  states?: any;
  categories?: { key: string[] };
  allCategories?: CatSubcatResponse;
}

interface LanguageOption {
  label: string;
  value: string;
}

const SettingsDialog: React.FC<YourComponentProps> = ({
  isOpen,
  handleClose,
  states,
  allCategories,
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    "countryCustomization"
  );

  const renderSection = () => {
    switch (activeSection) {
      case "stateCropSelection":
        return (
          <StateCategorySubCategory
            states={states}
            allCategories={allCategories}
          />
        );
      case "accountPreferences":
        return <AccountPreferences handleClose={handleClose} />;
      case "cropPreferences":
        return <CropSelection handleClose={handleClose} />;
      // case "themeCustomization":
      //   return <ThemeCustomization handleClose={handleClose} />;
      case "countryCustomization":
        return (
          <CountryCustomization states={states} handleClose={handleClose} />
        );
      default:
        return <AccountPreferences isOpen={isOpen} handleClose={handleClose} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-full w-full">
      <div className="w-full md:w-1/3 lg:w-1/4 p-5 overflow-auto bg-gray-50 dark:bg-gray-800">
        {/* Sidebar with options... */}
        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("countryCustomization")}
          >
            Country Preferences
          </li>
          <li
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setActiveSection("stateCropSelection")}
          >
            Crop Preferences
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

interface YourComponentProps {
  handleClose?: () => void;
}

interface TimezoneOption {
  label: string;
  value: string;
}

const AccountPreferences: React.FC<YourComponentProps> = ({ handleClose }) => {
  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  // State for selected timezone
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC-5");

  // Timezone options
  const timezoneOptions: TimezoneOption[] = [
    { label: "Eastern Time (UTC-5)", value: "UTC-5" },
    { label: "Pacific Time (UTC-8)", value: "UTC-8" },
    // Add more timezones as needed
  ];

  return (
    <section className="space-y-4">
      <div>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[
                { label: "English", value: "en" },
                { label: "Hindi", value: "hi" },
              ].map((language: LanguageOption, index: number) => (
                <SelectItem key={index} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {timezoneOptions.map(
                (timezone: TimezoneOption, index: number) => (
                  <SelectItem key={index} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

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

// for country customization
const CountryCustomization: React.FC<YourComponentProps> = ({}) => (
  <section className="space-y-4 h-full w-full">
    {/* <h2 className="text-lg font-semibold">Theme</h2> */}
    <Suspense>
      {/* <CountryStateSelector states={states} handleClose={handleClose} /> */}
      <CountryState />
    </Suspense>
  </section>
);

export default SettingsDialog;
