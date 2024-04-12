import ThemeCustomization from "@/components/generic/ThemeChanger";
import Location from "@/components/profile/Location";
import { SignupFormDemo } from "@/components/profile/Preferences";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      {/* <Location /> */}
      <SignupFormDemo />
      <div className="absolute top-4 right-8">
        <ThemeCustomization />
      </div>
    </div>
  );
};

export default page;
