// import { AnyRecord } from "dns";

const Prepopulate = ({
  data,
  onClick,
}: {
  data: string[];
  onClick: (str: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data &&
        data?.map((item: string, index: number) => (
          <div
            onClick={() => onClick(item)}
            key={index}
            className="group w-full cursor-pointer relative border p-2 rounded-md transition-colors duration-300 hover:text-black border-gray-300 hover:bg-gray-100 text-sm"
          >
            <div className="w-[90%]">{item}</div>
            <svg
              className="hidden group-hover:block absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11L12 6L17 11M12 18V7"
              />
            </svg>
          </div>
        ))}
    </div>
  );
};

export default Prepopulate;
