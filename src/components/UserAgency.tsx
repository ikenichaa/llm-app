import Loading from "./Loading";
import { emotions as emotion_list } from "../constatnt/emotions";

interface Prop {
  emotionStepperEmitEmotion: (emotion: string) => void;
  isLoading: boolean;
  emotion: string;
}

const EmotionStep = ({
  props = {
    emotionStepperEmitEmotion: () => {},
    isLoading: false,
    emotion: "",
  },
}: {
  props: Prop;
}) => {
  const EmotionListSelection = () => {
    const handleEmotionChange = (name: string) => {
      props.emotionStepperEmitEmotion(name);
    };

    return (
      <>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {emotion_list.map((emotion) => (
            <li
              key={emotion.id}
              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  id={emotion.id}
                  type="radio"
                  value=""
                  name={emotion.name}
                  checked={props.emotion === emotion.name}
                  onChange={() => handleEmotionChange(emotion.name)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                ></input>
                <label
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor={emotion.id}
                >
                  {emotion.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
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
        <div className="flex-col ">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Select Emotions
            </h3>
          </div>
          <div>
            <EmotionListSelection />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <EmotionBody />
      </div>
    </>
  );
};

export default EmotionStep;
