import { useState } from "react";

import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";
import { uploadFile } from "../api/upload";
import { useWebSocket } from "../contexts/WebSocketContext";

type steps = "first" | "second";
const Stepper = () => {
  const [activeStep, setActiveStep] = useState<steps>("first");
  const { sessionId } = useWebSocket();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [storyDescription, setStoryDescription] = useState<string>("");

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
  };

  const handleDescriptionChange = (description: string) => {
    setStoryDescription(description);
  };

  const nextStep = () => {
    try {
      if (!uploadedFile) {
        throw new Error("Please upload a file before proceeding.");
      }
      if (!storyDescription) {
        throw new Error("Please provide a description before proceeding.");
      }
      console.log("Upload file to session:", sessionId);
      uploadFile(uploadedFile as File, storyDescription, sessionId);
    } catch (error) {
      console.error("Error during file upload:", error);

      alert(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );

      return;
    }

    setActiveStep("second");
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

    return (
      <SecondPage
        props={{
          sessionId: sessionId,
        }}
      />
    );

    // return (
    //   <>
    //     <div className={`${activeStep === "first" ? "" : "hidden"}`}>
    //       <FirstPage
    //         props={{
    //           fileEmitter: handleFileChange,
    //           descriptionEmitter: handleDescriptionChange,
    //           file: uploadedFile,
    //           description: storyDescription,
    //           activeStep: activeStep,
    //         }}
    //       />
    //     </div>

    //     <div className={`${activeStep === "first" ? "hidden" : ""}`}>
    //       <SecondPage
    //         props={{
    //           sessionId: sessionId,
    //         }}
    //       />
    //     </div>
    //   </>
    // );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {" "}
        {/* Main container */}
        <ol className="flex items-center w-full justify-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className={
              activeStep === "first"
                ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "text-gray focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            }
          >
            1. Upload file & Description
          </button>

          <div className="pb-1.5">
            <FaAnglesRight />
          </div>

          <button
            type="button"
            className={
              activeStep === "second"
                ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "text-gray focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            }
          >
            2. User Agency & Summary
          </button>
        </ol>
        <main className="flex-grow">
          <div className="grid my-10 mx-20 gap-y-10">
            <StepperBody />
          </div>
        </main>
        {/* Sticky footer */}
        <div className="flex justify-center sticky bottom-0 bg-white rounded-lg shadow-2xl p-3 z-30">
          {activeStep == "second" && (
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div className="flex">
                <div className="pr-1 pt-0.5">
                  <FaAnglesLeft />
                </div>
                Clear Data and Restart
              </div>
            </button>
          )}

          {activeStep == "first" && (
            <button
              onClick={() => nextStep()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div className="flex">
                Next
                <div className="pl-1 pt-0.5">
                  <FaAnglesRight />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Stepper;
