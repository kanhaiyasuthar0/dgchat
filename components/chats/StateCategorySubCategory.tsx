"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
import { ChatContext } from "./ChatContext";
import { PuffLoader } from "react-spinners";
import { Label } from "../ui/label";
// interface StateOption {

// }

interface CatSubcatResponse {
  [key: string]: string[];
}
interface MyComponentProps {
  states?: any; // Preferably use a more specific type instead of 'any'
  allCategories?: CatSubcatResponse;
  loginStepSubmitter?: (data: any) => void;
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
  loginStepSubmitter,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // const { categories } = useContext(ChatContext);
  // console.log("🚀 ~ isOpen:", isOpen);
  //   console.log(searchParams);
  // const [selectedState, setSelectedState] = useState<string | null>(
  //   searchParams && searchParams.get("state")
  //     ? decodeURIComponent(searchParams.get("state")!)
  //     : localStorage?.getItem("state") ?? ""
  // );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams && searchParams.get("category")
      ? decodeURIComponent(searchParams?.get("category")!)
      : typeof window !== undefined
      ? localStorage?.getItem("category")
      : ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    searchParams && searchParams.get("crop")
      ? decodeURIComponent(searchParams?.get("crop")!)
      : typeof window !== undefined
      ? localStorage?.getItem("subcat")
      : ""
  );

  const [mainCategories, setMainCategories] = useState<any>([]);

  const [subcategories, setSubcategories] = useState(
    searchParams && searchParams.get("category")
      ? mainCategories[searchParams.get("category") || ""]
      : []
  );

  const { replace } = useRouter();

  // fetch categories and subcategories depending on the selected state of the particular country

  const [isLoading, setIsLoading] = useState(false);

  // Function to handle category change
  const handleCategoryChange = (e: string) => {
    const selectedCrop = e;
    setSelectedCategory(selectedCrop);
    localStorage.setItem("category", selectedCrop);
    setSubcategories(mainCategories[selectedCrop]);
  };
  const handleSubCategoryChange = (e: string) => {
    const selectedCrop = e;
    localStorage.setItem("subcat", selectedCrop);
    setSelectedSubCategory(selectedCrop);
  };

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     setSelectedSubCategory(localStorage?.getItem("subcat") ?? "");
  //   }
  // }, [selectedCategory]);

  console.log(states, "states in client");

  const handleSave = async () => {
    // setIsLoading(true);
    // const params = new URLSearchParams(window.location.search);
    // console.log("🚀 ~ handleSave ~ params:", params);

    // if (selectedCategory) {
    //   params.set("category", encodeURIComponent(selectedCategory));
    // } else {
    //   params.delete("category");
    //   return;
    // }

    // if (selectedSubCategory) {
    //   params.set("crop", encodeURIComponent(selectedSubCategory));
    // } else {
    //   params.delete("crop");
    //   return;
    // }

    // setIsLoading(false);

    // replace(`${pathname}?${params.toString()}`);

    toast(`Selection done`, {
      description: `Category : ${selectedCategory}, SubCategory : ${selectedSubCategory}`,
    });
    if (loginStepSubmitter) {
      loginStepSubmitter(localStorage?.subcat);
    }
  };

  async function fetchCatAndSubcat(selectedState: string) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ai/chat/cat_and_subcat/?state=${selectedState}`,
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
      //   return data;
      setMainCategories(data);
      console.log(data, localStorage?.getItem("category"), "yaha");
      let selectedCrop = localStorage?.getItem("category");
      if (selectedCrop) {
        setSubcategories(data[selectedCrop]);
      }
      let selectedSubCat = localStorage?.getItem("subcat");
      if (selectedSubCat) {
        setSelectedSubCategory(selectedSubCat);
      }
      // if (searchParams?.get("category") || localStorage?.getItem("category")) {
      //   setSubcategories(
      //     data[
      //       earchParams?.get("category") || localStorage?.getItem("category")
      //     ]
      //   );
      //   if (localStorage?.getItem("subcat")) {
      //     setSelectedSubCategory(localStorage?.getItem("subcat"));
      //   }
      // }
      // return data;
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
      // return {};
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("calling useeffect");
    if (searchParams?.get("state") || localStorage?.getItem("state")) {
      const data = fetchCatAndSubcat(
        JSON.parse(localStorage?.getItem("state") || "").name!
      );
    }
  }, []);

  return (
    <div
      className="space-y-4 dark:bg-gray-900 border w-full bg-gray-100 flex flex-col p-8 shadow-lg h-full rounded-lg transition-colors duration-300"

      // className={``}
    >
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <PuffLoader loading color="black" />
        </div>
      ) : (
        <>
          <div className="flex gap-4 flex-col">
            <Label>Crop selection (Category / Subcategory)</Label>
            <Select
              value={selectedCategory!}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(mainCategories)?.map((category, index) => (
                    <SelectItem
                      className="capitalize"
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {
            <Select
              disabled={!selectedCategory}
              value={selectedSubCategory!}
              onValueChange={handleSubCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Select a category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories?.map(
                    (subcategory: string, subIndex: string) => {
                      return (
                        <SelectItem
                          className="capitalize"
                          key={subIndex}
                          value={subcategory}
                        >
                          {subcategory}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          }

          <button
            disabled={!selectedCategory && !selectedSubCategory}
            onClick={handleSave}
            className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
          {loginStepSubmitter && (
            <button
              // disabled={!selectedCategory && !selectedSubCategory}
              onClick={() => loginStepSubmitter("previous")}
              className="mt-4 w-full dark:text-white text-white bg-gray-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Back
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default StateCategorySubCategory;
