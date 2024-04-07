"use client";
import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <PuffLoader loading color="black" />
    </div>
  );
};

export default Loading;
