// "use client";
// // components/CountrySelector.js
// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// // A simple modal component for state selection
// // You would replace this with your modal implementation, potentially using a library for fetching states
// const StateSelectionModal = ({ isOpen, onClose, country }) => {
//   const handleStateSelect = (state) => {
//     console.log(`State selected: ${state}`);
//     onClose(); // Close the modal after selection
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="bg-gray-800 p-5 rounded-lg">
//           <h2 className="text-white text-lg mb-4">
//             Select a State in {country}
//           </h2>
//           {/* Placeholder for state selection */}
//           <button
//             onClick={() => handleStateSelect("Some State")}
//             className="text-white bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded"
//           >
//             Select State
//           </button>
//         </div>
//       </div>
//     )
//   );
// };
// const CountrySelector = () => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const countries = ["India", "Kenya", "Ethiopia"]; // Initial list of countries

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setIsModalOpen(true); // Trigger the state selection modal
//   };

//   function handleSearch(term: string) {
//     const params = new URLSearchParams(searchParams);
//     console.log("🚀 ~ handleSearch ~ params:", params);
//     if (term) {
//       params.set("modalfor", term);
//     } else {
//       params.delete("modalfor");
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }

//   return (
//     <div className="bg-gray-700 p-4 rounded-lg">
//       <Link href={"/chat/settings"}>
//         <button
//           // onClick={() => handleSearch("country")}
//           className="text-white bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded block w-full text-left"
//         >
//           Select a Country
//         </button>
//       </Link>
//       {/* <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-800 rounded-lg shadow">
//           <DropdownMenuLabel className="text-white px-4 py-2">
//             Countries
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator className="bg-gray-600" />
//           {countries.map((country) => (
//             <DropdownMenuItem
//               key={country}
//               onSelect={() => handleCountrySelect(country)}
//               className="text-white px-4 py-2 hover:bg-gray-600"
//             >
//               {country}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <StateSelectionModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         country={selectedCountry}
//       /> */}
//     </div>
//   );
// };

// export default CountrySelector;

import Link from "next/link";
import React from "react";

const CountrySelector = () => {
  return (
    <Link href={"/chat/country"}>
      <div
        // onClick={() => handleSearch("country")}
        className="text-white bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded block w-full text-left"
      >
        Select a Country
      </div>
    </Link>
  );
};

export default CountrySelector;
