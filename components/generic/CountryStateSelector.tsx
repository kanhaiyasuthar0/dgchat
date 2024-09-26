import React, { useState, useEffect, FC, useContext } from "react";
// import Select, { SingleValue } from "react-select";
import { Country, State } from "country-state-city";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { ChatContext } from "../chats/ChatContext";
import { PuffLoader } from "react-spinners";
// Define types for the options used in react-select
// interface IOption {
//   label: string;
//   value: string;
// }

// Define props for the CountryStateSelector component
interface CountryStateSelectorProps {
  handleClose: () => void;
  states: string[];
}

// Unfortunately, react-select doesn't support TailwindCSS utility classes directly.
// You'll need to define custom styles for react-select components
// and try to match them with your TailwindCSS theme colors as closely as possible.
const customStyles = {
  control: (styles: any) => ({
    ...styles,
    // backgroundColor: "transparent",
    borderColor: "#374151", // gray-700
    color: "white",
    ":hover": {
      borderColor: "#4B5563", // gray-600
    },
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: "#1F2937", // gray-800
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    backgroundColor: isSelected ? "#374151" : isFocused ? "#4B5563" : undefined,
    color: "#F9FAFB", // white-ish
    ":active": {
      backgroundColor: "#374151",
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "black", // gray-50
  }),
};

const CountryStateSelector: FC<CountryStateSelectorProps> = ({
  handleClose,
  states,
}) => {
  const searchParam = useSearchParams();

  // const { categories, fetchCatAndSubcat } = useContext(ChatContext);

  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [states, setStates] = useState<IOption[]>([]);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [availableState, setAvailableStates] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    "India"
  );
  // const [selectedState, setSelectedState] = useState<IOption | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  //   console.log(searchParams);
  const [selectedState, setSelectedState] = useState<string | null>(
    searchParams && searchParams.get("state")
      ? decodeURIComponent(searchParams.get("state")!)
      : localStorage?.getItem("state") ?? ""
  );

  async function handleSearchParam(country: string, state: string) {
    if (state) {
      localStorage?.setItem("state", state);
    }

    // const params = new URLSearchParams(window.location.search);
    // if (country) {
    //   params.set("country", country);
    //   localStorage?.setItem("country", country);
    //   state && params.set("state", state);

    //   // await fetchCatAndSubcat(state);
    // } else {
    //   params.delete("country");
    //   params.delete("state");
    //   // localStorage.removeItem("country");
    // }

    // replace(`${pathname}?${params.toString()}`);

    // router.push(`${pathname}?${params.toString()}`);
    // revalidatePath(`${pathname}?${params.toString()}`);
  }

  const handleStateChange = (selectedOption: string) => {
    setSelectedState(selectedOption);
  };

  const handleSave = () => {
    if (selectedCountry && selectedState) {
      handleSearchParam("India", selectedState);
      // handleClose();
      toast("Preferences saved.");
    }
  };
  async function fetchStates() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/ai/chat/state/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const states: string[] = await response.json();
      console.log("🚀 ~ fetchStates ~ states:", states);
      setAvailableStates(states);
      // return states;
    } catch (error) {
      console.error("Error fetching states:", error);
      // return [];
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry]);

  return (
    <div className="space-y-4 dark:bg-gray-800 bg-white p-4 rounded-lg shadow h-full w-full">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <PuffLoader loading color="black" />
        </div>
      ) : (
        <>
          <Select
            value={selectedCountry!}
            onValueChange={(value) => setSelectedCountry(value)}
            disabled
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>States</SelectLabel> */}
                {["India"]?.map((country: string, index: number) => (
                  <SelectItem key={index} value={country}>
                    {" "}
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedState!} onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>States</SelectLabel> */}
                {availableState?.map((state: string, index: number) => (
                  <SelectItem key={index} value={state}>
                    {" "}
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            disabled={!selectedState}
            onClick={handleSave}
            className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:bg-gray-400"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default CountryStateSelector;
