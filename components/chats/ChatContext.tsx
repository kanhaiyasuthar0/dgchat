"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export const ChatContext = createContext({});

interface CatSubcatResponse {
  [key: string]: string[];
}
interface Categories {
  [key: string]: string[] | undefined;
}
export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Categories>({});

  async function fetchCatAndSubcat(
    selectedState: string
  ): Promise<CatSubcatResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/ai/chat/cat_and_subcat/?state=${selectedState}`,
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
      setCategories(data);
      return data;
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
      return {};
    }
  }

  return (
    <ChatContext.Provider value={{ categories, fetchCatAndSubcat }}>
      {children}
    </ChatContext.Provider>
  );
}
