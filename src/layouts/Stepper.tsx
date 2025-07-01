import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";
import { uploadFile } from "../api/upload";

type steps = "first" | "second";
const Stepper = () => {
  const [activeStep, setActiveStep] = useState<steps>("first");
  const [recommendedEmotion, setRecommendedEmotion] = useState<string>("");
  const [recommendedEmotionReason, setRecommendedEmotionReason] =
    useState<string>("");

  const [inappropriateEmotion, setInappropriateEmotion] = useState<string>("");
  const [inappropriateEmotionReason, setInappropriateEmotionReason] =
    useState<string>("");
  const [affectiveNarrative, setAffectiveNarrative] = useState<string>("");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [storyDescription, setStoryDescription] = useState<string>("");
  const [ws, setWs] = useState<null | WebSocket>(null);
  const [sessionId] = useState(() => uuidv4());

  useEffect(() => {
    console.log("Creating WebSocket connection...");
    console.log("Session ID:", sessionId);
    const websocket = new WebSocket(
      "ws://127.0.0.1:8000/websocket/ws/" + sessionId
    );
    setWs(websocket);

    websocket.onopen = () =>
      console.log(
        `Connected to WebSocket server with session ID: ${sessionId}`
      );
    websocket.onmessage = (event) => {
      console.log("Received message:", event);
      console.log("Message from server:", event.data);
      const data = JSON.parse(event.data);
      console.log("Parsed data:", data);
      if (data["data"]["title"] === "recommended_emotion") {
        setRecommendedEmotion(data["data"]["result"]["emotion"]);
        setRecommendedEmotionReason(data["data"]["result"]["reason"]);
      }

      if (data["data"]["title"] === "inappropriate_emotion") {
        if (data["data"]["result"]["is_there_inappropriate_emotion"]) {
          setInappropriateEmotion(
            data["data"]["result"]["inappropriate_emotion"]
          );
          setInappropriateEmotionReason(data["data"]["result"]["reason"]);
        }
      }

      if (data["data"]["title"] === "affective_narrative") {
        console.log("Received affective narrative data:", data);
        setAffectiveNarrative(data["data"]["result"]);
      }
    };

    websocket.onclose = () =>
      console.log(
        `Disconnected from WebSocket server with session ID: ${sessionId}`
      );

    // Cleanup on unmount
    return () => websocket.close();
  }, []);

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
          recommendedEmotion: recommendedEmotion || "",
          recommendedEmotionReason: recommendedEmotionReason || "",
          inappropriateEmotion: inappropriateEmotion || "",
          inappropriateEmotionReason: inappropriateEmotionReason || "",
          summaryText: affectiveNarrative || "",
          visualizationImages: [],
          sessionId: sessionId,
        }}
      />
    );
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
                ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "text-gray hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            }
            onClick={() => setActiveStep(previousStep())}
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
                ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "text-gray hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            }
            onClick={() => nextStep()}
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
        <div className="flex justify-center sticky bottom-0 bg-white rounded-lg shadow-2xl p-3">
          {activeStep == "second" && (
            <button
              onClick={() => setActiveStep(previousStep())}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div className="flex">
                <div className="pr-1 pt-0.5">
                  <FaAnglesLeft />
                </div>
                Previous
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
