"use client";
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

// Custom styles for react-select
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#2D2D2D",
    color: "white",
    borderColor: "#4A5568",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#2D2D2D",
  }),
  option: (provided: any, state: { isSelected: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#4A5568" : "#2D2D2D",
    color: "white",
    ":hover": {
      backgroundColor: "#4A5568",
    },
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
    <div className="p-4 dark:bg-gray-800 bg-white rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium dark:text-gray-300 text-gray-900 mb-1"
        >
          Country
        </label>
        <Select
          id="country"
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          styles={customStyles}
          placeholder="Select a country"
        />
      </div>
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium dark:text-white text-gray-900 mb-1"
        >
          State
        </label>
        <Select
          id="state"
          options={states}
          value={selectedState}
          onChange={handleStateChange}
          styles={customStyles}
          placeholder="Select a state"
          isDisabled={!selectedCountry}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 shadow-lg transform transition-transform duration-150 ease-in-out hover:scale-105"
      >
        Save
      </button>
    </div>
  );
};

export default CountryStateSelector;
