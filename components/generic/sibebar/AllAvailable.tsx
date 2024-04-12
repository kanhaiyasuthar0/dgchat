import { Boxes, BrainCircuit } from "lucide-react";
import Link from "next/link";
import React from "react";

const AllAvailable = () => {
  const data = ["Government", "Mentors"];

  return (
    <>
      {data?.map((item, index) => {
        return (
          <Link
            key={index}
            href={`/services/?type=${item}`}
            className="flex gap-5 p-2 hover:bg-gray-100 rounded-sm dark:hover:bg-gray-700"
          >
            {index == 0 ? <Boxes /> : <BrainCircuit />} {item}
          </Link>
        );
      })}
    </>
  );
};

export default AllAvailable;
