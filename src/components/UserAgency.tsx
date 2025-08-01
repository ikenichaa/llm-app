import { memo, useState, useEffect } from "react";
import { Tooltip } from "flowbite-react";

import { emotions as emotion_list } from "../constant/emotions";
import type { GenerateNarrativePayload as generatePayload } from "../api/generateNarrative";
import { useWebSocket } from "../contexts/WebSocketContext";

interface Prop {
  emitClickGenerate?: (arg0: generatePayload) => void;
}

const purpose_list = [
  {
    id: "1",
    name: "Inform",
  },
  {
    id: "2",
    name: "Pursuade",
  },
  {
    id: "3",
    name: "Explain",
  },
];
const colorOptions = [
  ["#4A90E2", "#50E3C2", "#FF6B6B"],
  ["#4A4A4A", "#8B0000", "#FFD700"],
  ["#FFB083", "#F9C784", "#F48C06"],
  ["#9B59B6", "#3498DB", "#2ECC71"],
];

function WordCountSlider({
  wordCount,
  onSliderChange,
}: {
  wordCount: number;
  onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      {/* The range input (slider) */}
      <input
        id="word-count-slider"
        type="range"
        min="200"
        max="500"
        value={wordCount}
        onChange={onSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}
const UserAgency = ({
  props = {
    emitClickGenerate: (_: generatePayload) => {},
  },
}: {
  props: Prop;
}) => {
  const [localWordCount, localSetWordCount] = useState("350");

  // This function will be passed down to the slider.
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localSetWordCount(event.target.value);
  };

  console.log("[User Agency] App component rendering...");
  const {
    recommendedEmotion,
    recommendedEmotionReason,
    inappropriateEmotion,
    inappropriateEmotionReason,
    selectedEmotion,
    setSelectedEmotion,
    emotionIntensity,
    setEmotionIntensity,
    selectedWordCount,
    setWordCount,
    purpose,
    setPurpose,
    colorScheme,
    setColorScheme,
    isGeneratingSummary, // To disable button when generating
  } = useWebSocket();

  const emotionIntensityToString = (intensity: number): string => {
    switch (intensity) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default:
        return "Medium";
    }
  };

  // Example handler for the submit button
  const handleSubmit = async () => {
    if (props.emitClickGenerate) {
      props.emitClickGenerate({
        emotion: selectedEmotion,
        intensity_level: emotionIntensityToString(emotionIntensity),
        word_count: +selectedWordCount,
        purpose: purpose,
      });
    }

    console.log("Emitting Generated Payload: ", {
      selectedEmotion,
      emotionIntensity,
      selectedWordCount,
      purpose,
      colorScheme,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localWordCount !== selectedWordCount) {
        console.log(`Debounced: Updating global context to ${localWordCount}`);
        setWordCount(localWordCount);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [localWordCount, selectedWordCount, setWordCount]);

  useEffect(() => {
    localSetWordCount(selectedWordCount);
  }, [selectedWordCount]);

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2 border-gray-200">
          Input Parameters
        </h2>
        <div className="flex flex-col gap-y-6">
          {/* Emotion Selection */}
          <div>
            <div className="mb-2">
              <label className="block text-base font-medium text-gray-700 mb-2">
                The Story Emotion:
              </label>
              {recommendedEmotion && (
                <span className="text-sm text-gray-500">
                  The recommended emotion is{" "}
                  <span className="font-bold">{recommendedEmotion}</span>
                  {" as "}
                  {recommendedEmotionReason}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {emotion_list.map((emotion) => {
                const isInappropriate = inappropriateEmotion.includes(
                  emotion.name.toLowerCase()
                );
                const button = (
                  <button
                    key={emotion.id}
                    type="button"
                    onClick={() => {
                      console.log(
                        "[User Agency]: Setting selected emotion to",
                        emotion.name
                      );
                      setSelectedEmotion(emotion.name.toLowerCase());
                    }}
                    disabled={isInappropriate}
                    className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isInappropriate // Priority 1: Inappropriate/Disabled
                        ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-70"
                        : selectedEmotion === emotion.name.toLowerCase() // Priority 2: Selected
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700" // Priority 3: Not selected but selectable
                    }
                  `}
                    aria-pressed={
                      selectedEmotion === emotion.name.toLowerCase()
                    }
                  >
                    {emotion.name}
                  </button>
                );
                return isInappropriate ? (
                  <Tooltip
                    key={emotion.id}
                    content={inappropriateEmotionReason}
                  >
                    {button}
                  </Tooltip>
                ) : (
                  button
                );
              })}
            </div>
          </div>

          {/* Emotional Intensity Level */}
          <div>
            <div className="mb-2">
              <label className="block text-base font-medium text-gray-700">
                Emotional Intensity Level:
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setEmotionIntensity(Math.max(1, emotionIntensity - 1))
                }
                disabled={emotionIntensity <= 1}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              >
                -
              </button>
              <div className="flex text-center items-center">
                <span className="text-lg font-semibold text-gray-900 w-16">
                  {emotionIntensity === 3
                    ? "High"
                    : emotionIntensity === 2
                    ? "Medium"
                    : "Low"}
                </span>
              </div>
              <button
                onClick={() =>
                  setEmotionIntensity(Math.min(3, emotionIntensity + 1))
                }
                disabled={emotionIntensity >= 3}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Word Count Selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Approximate Word Count: {localWordCount} words
            </label>
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <WordCountSlider
                  wordCount={+localWordCount}
                  onSliderChange={handleSliderChange}
                />
              </div>
            </div>
          </div>

          {/* Purpose of the story */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Purpose:
            </label>
            <div className="flex flex-wrap gap-4">
              {purpose_list.map((p) => (
                // <label key={p} className="inline-flex items-center">
                //   <input
                //     type="radio"
                //     className="form-radio text-blue-600 rounded-full focus:ring-blue-500"
                //     name="purpose"
                //     value={p}
                //     checked={purpose === p}
                //     onChange={(e) => setPurpose(e.target.value)}
                //   />
                //   <span className="ml-2 text-sm text-gray-700">{p}</span>
                // </label>
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    console.log(
                      "[User Agency]: Setting selected emotion to",
                      p.name
                    );
                    setPurpose(p.name);
                  }}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      purpose === p.name
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700" // Priority 3: Not selected but selectable
                    }
                  `}
                  aria-pressed={purpose === p.name}
                >
                  {p.name}
                </button>
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
              disabled={isGeneratingSummary}
              className={`
          w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300
          ${
            isGeneratingSummary
              ? "bg-blue-400 cursor-not-allowed opacity-70"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg transform hover:scale-105"
          }
          focus:outline-none focus:ring-4 focus:ring-blue-300
        `}
            >
              {isGeneratingSummary ? "Generating Output..." : "Generate Output"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(UserAgency);
