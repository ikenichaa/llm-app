import { useState, memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { useWebSocket } from "../contexts/WebSocketContext"; // Adjust path as needed

interface summaryProp {
  isGeneratingNarrative: boolean;
}

// Array of image URLs for the visualization gallery
// const visualizationImages = [
//   "https://placehold.co/500x300/a0c4ff/ffffff?text=Visualization+Image+1",
//   "https://placehold.co/500x300/ffadad/ffffff?text=Visualization+Image+2",
//   "https://placehold.co/500x300/ffd6a5/ffffff?text=Visualization+Image+3",
//   "https://placehold.co/500x300/caffbf/ffffff?text=Visualization+Image+4",
//   "https://placehold.co/500x300/bae1ff/ffffff?text=Visualization+Image+5",
// ];

const SummaryStep = ({
  props = {
    // summaryText: "",
    isGeneratingNarrative: false,
    // visualizationImages: [],
  },
}: {
  props: summaryProp;
}) => {
  const {
    summary,
    visualizationImages,
    // isOutputReady,
  } = useWebSocket();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % visualizationImages.length
    );
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + visualizationImages.length) %
        visualizationImages.length
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2 border-gray-200">
        Generated Output
      </h2>

      {/* Visualization Gallery */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Visualization
          </h3>
          {props.isGeneratingNarrative &&
            (visualizationImages?.length ?? 0) == 0 && (
              <div className="flex justify-center items-center space-x-2">
                <span>Loading</span>
                <div className="w-8 h-8 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
        </div>
        <div className="relative w-full">
          {(visualizationImages ?? []).length > 0 && (
            <>
              <div className="relative h-56 rounded-lg md:h-96">
                {/* Dynamically render images based on current index */}
                {visualizationImages.map((src, index) => (
                  <div
                    key={index}
                    // Only display the current image item
                    className={`duration-700 ease-in-out absolute top-0 left-0 w-full h-full flex justify-center items-center transform ${
                      index === currentImageIndex
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                    style={{
                      transition: "opacity 0.7s ease-in-out", // Simple fade transition
                    }}
                  >
                    <img
                      src={src}
                      className="block max-w-full h-auto object-contain"
                      alt={`Visualization ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center pt-4">
                <button
                  type="button"
                  onClick={prevImage}
                  className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-md border border-gray-200 min-h-[150px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
        {props.isGeneratingNarrative && summary == "" && (
          <div className="flex justify-center items-center space-x-2">
            <span>Loading</span>
            <div className="w-8 h-8 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
        <p className="text-gray-700 leading-relaxed text-justify"> {summary}</p>
      </div>
    </>
  );
};

export default memo(SummaryStep); // Memoize Summary as well
