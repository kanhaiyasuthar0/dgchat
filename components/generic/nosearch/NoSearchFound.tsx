const NoResultsFound = ({ query }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.172 16.828a4 4 0 101.414-1.414L12 13m0 0l-2.828-2.829m2.828 2.829L15 10.172m0 0l2.828 2.828m0 0a4 4 0 11-1.414 1.414L15 13m0 0l-2.828 2.829"
        />
      </svg>
      <h3 className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
        No Results Found
      </h3>
      <p className="text-gray-500 dark:text-gray-300">
        We couldn&apos;t find any results for &quot;{query}&quot;. Try checking
        your spelling or use more general terms.
      </p>
    </div>
  );
};

export default NoResultsFound;
