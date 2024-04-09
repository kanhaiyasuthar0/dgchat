"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
// interface StateOption {

// }

interface CatSubcatResponse {
  [key: string]: string[];
}
interface MyComponentProps {
  states: any; // Preferably use a more specific type instead of 'any'
  allCategories?: CatSubcatResponse;
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

const StateCategorySubCategory: React.FC<MyComponentProps> = ({
  states,
  allCategories,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  //   console.log(searchParams);
  const [selectedState, setSelectedState] = useState<string | null>(
    searchParams && searchParams.get("state")
      ? decodeURIComponent(searchParams.get("state")!)
      : ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams && searchParams.get("crop")
      ? decodeURIComponent(searchParams?.get("crop")!)
      : ""
  );
  const [categories, setCategories] = useState<Categories>(allCategories || {});
  //   console.log("🚀 ~ categories:", categories);

  const { replace } = useRouter();
  console.log("🚀 ~ allCategories: from server", allCategories);

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

  const [isLoading, setIsLoading] = useState(false);
  // Function to handle state change
  const handleStateChange = async (e: string) => {
    setIsLoading(true);
    console.log(e);
    const newState = e;
    setSelectedState(newState);

    const response = await fetchCatAndSubcat(newState);
    setCategories(response);
    // Reset category selection
    setSelectedCategory("");
    setIsLoading(false);
    // Here, you would also trigger the fetching of categories based on the selected state
  };

  // Function to handle category change
  const handleCategoryChange = (e: string) => {
    const selectedCrop = e;
    console.log("🚀 ~ handleCategoryChange ~ selectedCrop:", selectedCrop);
    setSelectedCategory(selectedCrop);

    // Here, you might want to do something with the selected category
  };
  console.log(states, "states in client");

  const handleSave = async () => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    console.log("🚀 ~ handleSave ~ params:", params);
    if (selectedState) {
      params.set("state", encodeURIComponent(selectedState));
    } else {
      params.delete("state");
      return;
    }

    if (selectedCategory) {
      params.set("crop", encodeURIComponent(selectedCategory));
    } else {
      params.delete("crop");
      return;
    }

    setIsLoading(false);

    // router.replace(
    //   {
    //     pathname: window.location.,
    //   }
    //   //     query: {
    //   //       ...router.query,
    //   //       state: selectedState,
    //   //       crop: selectedCategory,
    //   //     }, // Spread the existing query params and add/update "saved"
    //   //   },
    //   //   undefined,
    //   //   { shallow: true }
    // );

    // router.push(

    // ); // Sh

    replace(`${pathname}?${params.toString()}`);
    toast("Crop selection done.");

    // router.push();

    // router.refresh();
  };

  //   useEffect(()=>{

  //   })

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

      {
        <Select
          disabled={!selectedState || isLoading}
          value={selectedCategory!}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isLoading ? "Fetching categories..." : "Select a category"
              }
            />
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
      }

      <button
        disabled={!selectedState && !selectedCategory}
        onClick={handleSave}
        className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        {isLoading ? "Loading..." : "Save"}
      </button>
    </div>
  );
};

export default StateCategorySubCategory;
