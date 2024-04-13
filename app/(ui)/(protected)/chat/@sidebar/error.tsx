"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-fit p-10 h-50 flex-col items-center justify-center  min-h-fit border-white  bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="">Something went wrong!</div>
      <Button
        onClick={() => reset()}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
      >
        Reload
      </Button>
    </div>
  );
}
