import React, { useState, useEffect, FC } from "react";
import Select, { SingleValue } from "react-select";
import { Country, State } from "country-state-city";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Define types for the options used in react-select
interface IOption {
  label: string;
  value: string;
}

// Define props for the CountryStateSelector component
interface CountryStateSelectorProps {
  handleClose: () => void;
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
}) => {
  const searchParam = useSearchParams();
  const [countries, setCountries] = useState<IOption[]>([]);
  const [states, setStates] = useState<IOption[]>([]);
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<IOption | null>(null);
  const [selectedState, setSelectedState] = useState<IOption | null>(null);

  function handleSearchParam(country: string, state: string) {
    const params = new URLSearchParams(window.location.search);
    if (country) {
      params.set("country", country);
      state && params.set("state", state);
    } else {
      params.delete("country");
      params.delete("state");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleStateChange = (selectedOption: SingleValue<IOption>) => {
    setSelectedState(selectedOption as IOption);
  };

  const handleSave = () => {
    if (selectedCountry && selectedState) {
      handleSearchParam(selectedCountry.value, selectedState.value);
      handleClose();
    }
  };

  useEffect(() => {
    const allowedCountriesIsoCodes = ["IN", "KE", "ET"];
    const allCountries = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    const filteredCountries = allCountries.filter((country) =>
      allowedCountriesIsoCodes.includes(country.value)
    );
    setCountries(filteredCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value).map(
        (state) => ({
          label: state.name,
          value: state.isoCode,
        })
      );
      setStates(states);
    }
  }, [selectedCountry]);

  return (
    <div className="dark:bg-gray-800 bg-white p-4 rounded-lg shadow">
      <Select
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        styles={customStyles}
        classNamePrefix="react-select"
        placeholder="Select a country..."
        className="dark:text-gray-200 text-gray-800"
        isDisabled
      />
      <Select
        options={states}
        value={selectedState}
        onChange={handleStateChange}
        styles={customStyles}
        classNamePrefix="react-select"
        placeholder="Select a state..."
        className="mt-4 dark:text-gray-200 text-gray-800"
        isDisabled={!selectedCountry}
      />
      <button
        disabled={!selectedState}
        onClick={handleSave}
        className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:bg-gray-400"
      >
        Save
      </button>
    </div>
  );
};

export default CountryStateSelector;
