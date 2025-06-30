import { useState } from "react";
import Loading from "./Loading";

import { emotions as emotion_list } from "../constatnt/emotions";

import clp_1 from "../assets/pallete/clp_1.png";
import clp_2 from "../assets/pallete/clp_2.png";
import clp_3 from "../assets/pallete/clp_3.png";
import clp_4 from "../assets/pallete/clp_4.png";

interface Prop {
  emotionStepperEmitEmotion: (emotion: string) => void;
  isLoading: boolean;
}

const EmotionStep = ({
  props = {
    emotionStepperEmitEmotion: () => {},
    isLoading: false,
  },
}: {
  props: Prop;
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [emotionIntensity, setEmotionIntensity] = useState(1);

  const handleEmotionChange = (name: string) => {
    console.log("The emotion--->", name);
    setSelectedEmotion(name);
    props.emotionStepperEmitEmotion(name);
  };

  const EmotionBody = () => {
    if (props.isLoading) {
      return (
        <div className="flex gap-x-4">
          <Loading /> Analyzing the text...
        </div>
      );
    } else {
      return (
        <>
          <div className="flex flex-row justify-between gap-x-10">
            <div className="w-1/2">
              <span className="block mb-2 text-sm font-medium text-gray-900">
                Select an emotion
              </span>
              <select
                id="emotion"
                value={selectedEmotion}
                onChange={(e) => handleEmotionChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {emotion_list.map((emotion) => (
                  <option key={emotion.id} value={emotion.name}>
                    {emotion.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              {/* <span className="block mb-2 text-sm font-medium text-gray-900">
                Emotion intensity level
              </span>
              <input
                id="steps-range"
                type="range"
                min="0"
                max="10"
                value={emotionIntensity}
                onChange={(e) => setEmotionIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              /> */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Emotional Intensity Level
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="5"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                0 is the lowest and 10 is the highest intensity level
              </p>
            </div>
          </div>
          <div>
            <div className="relative">
              <span className="block mb-2 text-sm font-medium text-gray-900">
                Word Count
              </span>
              <input
                id="labels-range-input"
                type="range"
                min="100"
                max="1500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                100
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                250
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                500
              </span>
            </div>
          </div>
          <div>
            <span className="block mt-10 mb-2 text-sm font-medium text-gray-900">
              Purpose of this story
            </span>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Call to Action{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Provoke{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Explore{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Inform{" "}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <span className="block mt-5 mb-2 text-sm font-medium text-gray-900">
              Colour scheme for visualization
            </span>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-color"
                    type="radio"
                    value=""
                    name="list-radio-color"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <img className="ml-3" src={clp_1} alt="Logo" />
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-color"
                    type="radio"
                    value=""
                    name="list-radio-color"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <img className="ml-3" src={clp_2} alt="Logo" />
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-color"
                    type="radio"
                    value=""
                    name="list-radio-color"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <img className="ml-3" src={clp_3} alt="Logo" />
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-color"
                    type="radio"
                    value=""
                    name="list-radio-color"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <img className="ml-3" src={clp_4} alt="Logo" />
                </div>
              </li>
            </ul>
          </div>
        </>
      );
    }
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
