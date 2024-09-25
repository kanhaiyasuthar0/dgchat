"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Search({
  placeholder,
  query,
}: {
  placeholder: string;
  query: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    console.log(term);
    //@ts-ignore
    const params = new URLSearchParams(searchParams!);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  // function handleCategorySearch(term){
  //   console.log(term);
  //   const params = new URLSearchParams(searchParams!);

  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }

  //   replace(`${pathname}?${params.toString()}`);
  // }

  return (
    <div className="relative shadow-md flex flex-1    rounded-lg flex-shrink-0 mb-10 border">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border-gray-200 py-[9px] pl-10 text-sm outline-none  placeholder:text-gray-500 focus:ring-0 focus:border-none bg-transparent dark:border-gray-700 dark:text-black dark:placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={query?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-600 dark:peer-focus:text-gray-600" />
    </div>
  );
}
