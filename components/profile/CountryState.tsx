"use client";
import React, { useState, useEffect } from "react";
import { Country, State, City, ICity as LibraryCity } from "country-state-city";
// Import useTheme from the context you created

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PuffLoader } from "react-spinners";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
interface ICountry {
  name: string;
  isoCode: string;
  flag?: string;
  phonecode?: string;
  currency?: string;
  latitude?: string;
  longitude?: string;
  timezones?: {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }[];
}

interface IState {
  name: string;
  isoCode: string;
}

interface ICity extends LibraryCity {
  // Assume that LibraryCity does not have isoCode, so we explicitly declare it here.
  isoCode?: string; // Make isoCode optional if it's not guaranteed to be provided by the library
}

const CountryState = () => {
  const [countries, setCountries] = useState<ICountry[] | string[]>([]);
  console.log("🚀 ~ CountryState ~ countries:", countries);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(
    JSON.stringify({
      name: "India",
      isoCode: "IN",
      flag: "🇮🇳",
      phonecode: "91",
      currency: "INR",
      latitude: "20.00000000",
      longitude: "77.00000000",
      timezones: [
        {
          zoneName: "Asia/Kolkata",
          gmtOffset: 19800,
          gmtOffsetName: "UTC+05:30",
          abbreviation: "IST",
          tzName: "Indian Standard Time",
        },
      ],
    })
  );
  console.log(
    typeof window !== undefined && localStorage?.country
      ? localStorage?.country
      : ""
  );
  const [selectedState, setSelectedState] = useState(
    typeof window !== undefined && localStorage?.state
      ? localStorage?.state
      : ""
  );
  console.log(selectedState, "selectedState");
  const [selectedCity, setSelectedCity] = useState(
    typeof window !== undefined && localStorage?.city ? localStorage?.city : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [villageName, setVillageName] = useState(localStorage?.village || "");
  useEffect(() => {
    setIsLoading(true);
    setCountries(Country.getAllCountries());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(JSON.parse(selectedCountry).isoCode));
      setSelectedState(
        typeof window !== undefined && localStorage?.state
          ? localStorage?.state
          : ""
      ); // Reset selected state
      setCities([]); // Clear cities when country changes
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(
        JSON.parse(selectedCountry).isoCode,
        JSON.parse(selectedState).isoCode
      ).map((city) => ({
        ...city,
        isoCode: "Some logic to determine the isoCode", // Add the missing property
      }));
      setCities(cities as ICity[]);
    }
  }, [selectedState]);

  const handleSaveConfig = () => {
    localStorage.setItem("country", selectedCountry);
    localStorage.setItem("state", selectedState);
    localStorage.setItem("city", selectedCity);
    localStorage.setItem("village", villageName);
  };
  //   console.log("🚀 ~ handleSaveConfig ~ selectedCountry:", selectedCountry);

  const handleVillageChange = (e: any) => {
    console.log("🚀 ~ handleVillageChange ~ e:", e);
    setVillageName(e.target.value);
  };
  return (
    <div
      className={`bg-gray-100 w-full border dark:bg-gray-900 p-8 rounded-lg transition-colors duration-300`}
    >
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <PuffLoader loading color="black" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-full mx-auto">
          <Label>Location (country/ state/ city/ village)</Label>
          <Select
            disabled
            defaultValue={JSON.stringify({
              name: "India",
              isoCode: "IN",
              flag: "🇮🇳",
              phonecode: "91",
              currency: "INR",
              latitude: "20.00000000",
              longitude: "77.00000000",
              timezones: [
                {
                  zoneName: "Asia/Kolkata",
                  gmtOffset: 19800,
                  gmtOffsetName: "UTC+05:30",
                  abbreviation: "IST",
                  tzName: "Indian Standard Time",
                },
              ],
            })}
            value={selectedCountry!}
            onValueChange={(value) => setSelectedCountry(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
              {countries?.map((country: any, index: number) => (
                <SelectItem key={index} value={JSON.stringify(country)}>
                  {" "}
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            // defaultValue={localStorage.getItem("state")!}
            value={selectedState!}
            disabled={!selectedCountry}
            onValueChange={(value) => setSelectedState(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {states?.map((state: any, index: number) => (
                <SelectItem key={state.isoCode} value={JSON.stringify(state)}>
                  {" "}
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            // defaultValue={}
            value={selectedCity!}
            disabled={!selectedState}
            onValueChange={(value) => setSelectedCity(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectGroup> */}
              {/* <SelectLabel>States</SelectLabel> */}
              {cities?.map((city: any, index: number) => (
                <SelectItem key={city.name} value={JSON.stringify(city)}>
                  {" "}
                  {city.name}
                </SelectItem>
              ))}
              {/* </SelectGroup> */}
            </SelectContent>
          </Select>

          {/* <LabelInputContainer> */}
          <Label htmlFor="village_name">Village Name</Label>
          {/* <Input id="firstname" placeholder="Tyler" type="text" /> */}
          <Input
            id="village_name"
            placeholder="Enter village name"
            disabled={!selectedCity}
            onChange={handleVillageChange}
            defaultValue={localStorage?.getItem("village") || ""}
          />
          {/* </LabelInputContainer> */}
          {/* <LabelInputContainer> */}

          <button
            disabled={!selectedCity}
            onClick={handleSaveConfig}
            className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryState;
