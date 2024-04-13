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
    <div className="flex w-full h-50 flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-8">
        {/* Update the src path to your error-specific graphic */}
        <Image
          src="/error.jpeg" // Adjust the image path to your error-specific image
          alt="Error"
          width={400}
          height={300}
          className="dark:filter h-20 w-20 dark:invert"
        />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        Uh-oh!
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Something went wrong on our end. Please try again later.
      </p>
      <Button
        onClick={() => reset()}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
      >
        Reload
      </Button>
    </div>
  );
}
