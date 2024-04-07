// components/NotFound.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-8">
        {/* This image can be any graphic that fits your "not found" theme. */}
        <Image
          src="/notfound.jpeg"
          alt="Not Found"
          width={400}
          height={300}
          className="dark:filter dark:invert"
        />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        Oops!
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
        >
          Go Home
        </Link>
      </>
    </div>
  );
};

export default NotFound;
