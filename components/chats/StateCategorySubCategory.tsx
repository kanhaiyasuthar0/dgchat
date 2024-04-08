"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
// import Select from "react-select";
// Assuming these are your state and categories data structures
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// interface StateOption {

// }

interface MyComponentProps {
  states: any; // Preferably use a more specific type instead of 'any'
}

interface Categories {
  [key: string]: string[] | undefined;
}

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

const StateCategorySubCategory: React.FC<MyComponentProps> = ({ states }) => {
  const [selectedState, setSelectedState] = useState<string | null>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Categories>({});
  console.log("🚀 ~ categories:", categories);

  const { replace } = useRouter();
  const pathname = usePathname();
  interface CatSubcatResponse {
    [key: string]: string[];
  }

  // fetch categories and subcategories depending on the selected state of the particular country
  async function fetchCatAndSubcat(
    selectedState: string
  ): Promise<CatSubcatResponse> {
    try {
      const response = await fetch(
        `https://sandbox.farmstack.digitalgreen.org/ai/chat/cat_and_subcat/?state=${selectedState}`,
        {
          method: "GET", // Change to 'GET' if your API expects a GET request.
          headers: {
            "Content-Type": "application/json",
          },
          // If it's actually a POST request and requires a body, uncomment the following line:
          // body: JSON.stringify({ state: selectedState }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CatSubcatResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
      return {};
    }
  }

  // Function to handle state change
  const handleStateChange = async (e: string) => {
    console.log(e);
    const newState = e;
    setSelectedState(newState);

    const params = new URLSearchParams(window.location.search);
    if (newState) {
      params.set("state", encodeURIComponent(newState));
    } else {
      params.delete("state");
    }
    replace(`${pathname}?${params.toString()}`);

    const response = await fetchCatAndSubcat(newState);
    setCategories(response);
    // Reset category selection
    setSelectedCategory("");
    // Here, you would also trigger the fetching of categories based on the selected state
  };

  // Function to handle category change
  const handleCategoryChange = (e: string) => {
    const selectedCrop = e;
    console.log("🚀 ~ handleCategoryChange ~ selectedCrop:", selectedCrop);
    setSelectedCategory(selectedCrop);

    const params = new URLSearchParams(window.location.search);
    if (selectedCrop) {
      params.set("crop", encodeURIComponent(selectedCrop));
    } else {
      params.delete("crop");
    }
    replace(`${pathname}?${params.toString()}`);
    // Here, you might want to do something with the selected category
  };
  console.log(states, "states in client");

  return (
    <div className="space-y-4 flex flex-col shadow-lg">
      {/* <select
        onChange={handleStateChange}
        value={selectedState}
        className="w-[1/2] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select State</option>
        
      </select> */}

      <Select value={selectedState!} onValueChange={handleStateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>States</SelectLabel> */}
            {states?.map((state: string, index: number) => (
              <SelectItem key={index} value={state}>
                {" "}
                {state}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <Select
        options={states ?? []}
        value={selectedState}
        onChange={handleStateChange}
        styles={customStyles}
        classNamePrefix="react-select"
        placeholder="Select a country..."
        className="dark:text-gray-200 text-gray-800"
      /> */}

      {/* {selectedState && (
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="w-[1/2] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
        </select>
      )} */}

      {selectedState && (
        <Select value={selectedCategory!} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>States</SelectLabel> */}
              {/* {states?.map((state, index) => (
             
                {" "}
                {state}
             
            ))} */}

              {Object.keys(categories)?.map((category, index) => (
                <SelectGroup key={index}>
                  {categories[category]?.map(
                    (subcategory: string, subIndex: number) => (
                      <SelectItem key={subIndex} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default StateCategorySubCategory;
