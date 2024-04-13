import { valuesreoriginalcorrespondingtoimport } from "@/data/image";
import Image from "next/image";
import React from "react";
import { FiHelpCircle } from "react-icons/fi";

interface AssistComponentProps {
  activeBotData?: {
    Name: string;
    Address: string;
    Description: string;
    Offering: string;
    "# Of Subscribers": number;
    "# Of Queries": number;
    "# Of Ratings": string;
  };
}

const AssistComponent: React.FC<AssistComponentProps> = ({ activeBotData }) => {
  // const active = {
  //   Category: "Government",
  //   Subcategory: "Agriculture Department",
  //   Name: "Jharkhand Department of Agriculture",
  //   Address: "Krishi Bhawan, Kanke Road, Ranchi",
  //   Description:
  //     "Serving as the cornerstone of Jharkhand's agricultural development, this department provides comprehensive support to farmers, including subsidies, training, and resources for sustainable farming practices.",
  //   Offering: "Subsidies, training, sustainable practices",
  //   "# Of Subscribers": 12000,
  //   "# Of Queries": 9500,
  //   "# Of Ratings": "★★★★☆",
  // };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {activeBotData ? (
        <>
          <div className="mb-5">
            {valuesreoriginalcorrespondingtoimport[`${activeBotData.Name}`] ? (
              <Image
                src={
                  valuesreoriginalcorrespondingtoimport[`${activeBotData.Name}`]
                }
                alt={`${activeBotData?.Name} logo`}
                width={100}
                height={100}
                className="object-contain w-full max-w-[200px] h-full"
              />
            ) : (
              <span className="text-xl font-bold text-white uppercase">
                {activeBotData?.Name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {activeBotData.Name}
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Address:{" "}
              <span className="font-medium">{activeBotData.Address}</span>
            </p>
            <p className="mt-2">{activeBotData.Description}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Offering:{" "}
              <span className="font-medium">{activeBotData.Offering}</span>
            </p>
          </div>
          <div className="flex justify-around w-full mt-3 py-2 mb-0">
            <span className="text-gray-900 dark:text-white">
              Subscribers:{" "}
              <span className="font-semibold">
                {activeBotData["# Of Subscribers"]}
              </span>
            </span>
            <span className="text-gray-900 dark:text-white">
              Queries:{" "}
              <span className="font-semibold">
                {activeBotData["# Of Queries"]}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-900 dark:text-white mt-2 mb-4">
            Ratings: {activeBotData["# Of Ratings"]}
          </p>
          <div className=" flex justify-center items-center flex-col border-t border-gray-200 dark:border-gray-700 w-full">
            <div className="text-gray-600 dark:text-gray-300 mb-4 mt-4">
              <FiHelpCircle size={32} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              How can I assist you today?
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-600 dark:text-gray-300 mb-4">
            <FiHelpCircle size={32} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            How can I assist you today?
          </p>
        </>
      )}
    </div>
  );
};

export default AssistComponent;
