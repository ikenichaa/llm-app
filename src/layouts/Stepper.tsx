import { useState } from "react";

import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";

type steps = "first" | "second";
const Stepper = () => {
  const [activeStep, setActiveStep] = useState<steps>("first");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [storyDescription, setStoryDescription] = useState<string>("");

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
  };

  const handleDescriptionChange = (description: string) => {
    setStoryDescription(description);
  };

  const nextStep = (): steps => {
    return "second";
  };

  const previousStep = (): steps => {
    return "first";
  };

  const StepperBody = () => {
    if (activeStep === "first") {
      return (
        <FirstPage
          props={{
            fileEmitter: handleFileChange,
            descriptionEmitter: handleDescriptionChange,
            file: uploadedFile,
            description: storyDescription,
            activeStep: activeStep,
          }}
        />
      );
    }

    return <SecondPage />;
  };

  return (
    <>
      <ol className="flex items-center w-full justify-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white  rounded-lg  dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li
          className={
            activeStep === "first"
              ? "flex items-center text-blue-600"
              : "flex items-center text-gray-600"
          }
        >
          <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-blue-500">
            1
          </span>
          Upload file & Description
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>

        <li
          className={
            activeStep === "second"
              ? "flex items-center text-blue-600"
              : "flex items-center text-gray-600"
          }
        >
          <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
            2
          </span>
          User Agency & Summary
        </li>
      </ol>
      <div className="grid my-16 mx-50 gap-y-10">
        <StepperBody />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setActiveStep(previousStep())}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveStep(nextStep())}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Stepper;
