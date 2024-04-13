"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./styles.css"; // This will contain the CSS for transitions
import { SignupFormDemo } from "./Preferences";
import StateCategorySubCategory from "../chats/StateCategorySubCategory";
import { redirect, useRouter } from "next/navigation";

function MultiStepForm() {
  const { register, handleSubmit, watch } = useForm();
  const steps = [1, 2]; // Define steps
  const [currentStep, setCurrentStep] = React.useState(0);
  console.log("🚀 ~ MultiStepForm ~ currentStep:", currentStep);
  const watchedFields = watch(); // Watch form fields to capture changes
  const router = useRouter();
  const loginStepSubmitter = (data: any) => {
    if (currentStep < steps.length - 1) {
      console.log("🚀 ~ loginStepSubmitter ~ data:", data);
      setCurrentStep(currentStep + 1);
    } else {
      if (data == "previous") {
        setCurrentStep(currentStep - 1);
        return;
      }
      console.log(data);
      //   redirect("/chat");
      router.push("/chat");

      // Final submission handling
    }
  };

  return (
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="p-5 bg-white dark:bg-gray-800"
    // >
    <div className="mt-[3/4]">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentStep}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          <div>
            {currentStep === 0 && (
              <>
                <SignupFormDemo loginStepSubmitter={loginStepSubmitter} />
              </>
            )}

            {currentStep === 1 && (
              <div className="form-step">
                <div className="max-w-md min-h-80 mt-10 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                  <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to Farmer Chat
                  </h2>
                  <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Please select your preferences
                  </p>
                  <StateCategorySubCategory
                    loginStepSubmitter={loginStepSubmitter}
                  />
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </div>
                {/* <button type="submit" className="mt-4">
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </button> */}
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default MultiStepForm;
