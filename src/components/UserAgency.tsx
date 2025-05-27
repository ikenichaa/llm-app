import { useState } from "react";
import Loading from "./Loading";

import { emotions as emotion_list } from "../constatnt/emotions";

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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an emotion
          </label>
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
              <>
                <option key={emotion.id} value={emotion.name}>
                  {emotion.name}
                </option>
              </>
            ))}
          </select>
        </div>
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
