import { useState } from "react";
import Loading from "./Loading";

import { emotions as emotion_list } from "../constatnt/emotions";

import clp_1 from "../assets/pallete/clp_1.png";
import clp_2 from "../assets/pallete/clp_2.png";
import clp_3 from "../assets/pallete/clp_3.png";
import clp_4 from "../assets/pallete/clp_4.png";

interface Prop {
  isLoading: boolean;
}

const word_count = [200, 300, 500];
const purpose_list = ["Call to Action", "Provoke", "Explore", "Inform"];
const colorOptions = [
  ["#4A90E2", "#50E3C2", "#FF6B6B"], // Example color schemes
  ["#4A4A4A", "#8B0000", "#FFD700"],
  ["#FFB083", "#F9C784", "#F48C06"],
  ["#9B59B6", "#3498DB", "#2ECC71"],
];

const EmotionStep = ({
  props = {
    isLoading: false,
  },
}: {
  props: Prop;
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState("joy");
  const [emotionIntensity, setEmotionIntensity] = useState(1);
  const [selectedWordCount, setWordCount] = useState(200);
  const [purpose, setPurpose] = useState("Inform");
  const [colorScheme, setColorScheme] = useState(colorOptions[0].join(","));

  // Example handler for the submit button
  const handleSubmit = async () => {
    // In a real application, you would gather all form data here
    // and make an API call (e.g., using the uploadFile function if applicable,
    // or a new function to generate summary/visualization based on these inputs).

    // Simulate API call for demonstration
    console.log("Submitting data:", {
      selectedEmotion,
      emotionIntensity,
      selectedWordCount,
      purpose,
      colorScheme,
    });
  };

  const EmotionBody = () => {
    if (props.isLoading) {
      return (
        <div className="flex gap-x-4">
          <Loading /> Analyzing the text...
        </div>
      );
    }
    return (
      <>
        <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2 border-gray-200">
          Input Parameters
        </h2>
        <div className="flex flex-col gap-y-6">
          {/* Emotion Selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              The Story Emotion:
            </label>
            <div className="flex flex-wrap gap-2">
              {emotion_list.map((emotion) => (
                <button
                  key={emotion.id}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion.name.toLowerCase())}
                  // Dynamically apply classes based on selection
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      selectedEmotion === emotion.name.toLowerCase()
                        ? "bg-blue-600 text-white shadow-md" // Selected style
                        : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700" // Unselected style
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105
                  `}
                  aria-pressed={selectedEmotion === emotion.name.toLowerCase()} // For accessibility
                >
                  {emotion.name}
                </button>
              ))}
            </div>
          </div>

          {/* Emotional Intensity Level */}
          <div>
            <div className="mb-2">
              <label className="block text-base font-medium text-gray-700">
                Emotional Intensity Level:
              </label>
              <span className="text-sm text-gray-500">
                1 is the lowest and 10 is the highest intensity level
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setEmotionIntensity((prev) => Math.max(1, prev - 1))
                }
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                {emotionIntensity}
              </span>
              <button
                onClick={() =>
                  setEmotionIntensity((prev) => Math.min(10, prev + 1))
                }
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Word Count Selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Approximate Word Count:
            </label>
            <div className="flex flex-wrap gap-2">
              {word_count.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => setWordCount(word)}
                  // Dynamically apply classes based on selection
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      selectedWordCount === word
                        ? "bg-blue-600 text-white shadow-md" // Selected style
                        : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700" // Unselected style
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  `}
                  aria-pressed={selectedWordCount === word} // For accessibility
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose of the story */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Purpose:
            </label>
            <div className="flex flex-wrap gap-4">
              {purpose_list.map((p) => (
                <label key={p} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 rounded-full focus:ring-blue-500"
                    name="purpose"
                    value={p}
                    checked={purpose === p}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Colour scheme for visualization:
            </label>
            <div className="flex flex-wrap gap-4">
              {colorOptions.map((scheme, index) => (
                <label
                  key={index}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="hidden" // Hide default radio button
                    name="colorScheme"
                    value={scheme.join(",")}
                    checked={colorScheme === scheme.join(",")}
                    onChange={(e) => setColorScheme(e.target.value)}
                  />
                  <div
                    className={`flex rounded-md overflow-hidden border-2 ${
                      colorScheme === scheme.join(",")
                        ? "border-blue-500 ring-2 ring-blue-300"
                        : "border-gray-200"
                    }`}
                  >
                    {scheme.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button - Placed at the bottom of the input column */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Generate Summary & Visualization
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <EmotionBody />
      </div>
    </>
  );
};
export default EmotionStep;
