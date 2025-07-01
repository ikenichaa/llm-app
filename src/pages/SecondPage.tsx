import { useState, useEffect } from "react";

import { mockSummaryText } from "../constatnt/mock";

import UserAgency from "../components/UserAgency";
import Summary from "../components/Summary";

interface SecondPageProps {
  recommendedEmotion?: string;
  recommendedEmotionReason?: string;
  inappropriateEmotion?: string;
  inappropriateEmotionReason?: string;
  summaryText?: string;
}

// --- LoadingSpinner Component ---
const LoadingSpinner = ({ message }: { message: string }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4">
        {/* Spinner animation */}
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Loading message */}
        <p className="text-lg font-semibold text-gray-700">{message}</p>
      </div>
    </div>
  );
};

const SecondPage = ({
  props = {
    recommendedEmotion: "",
    recommendedEmotionReason: "",
    inappropriateEmotion: "",
    inappropriateEmotionReason: "",

    summaryText: "",
  },
}: {
  props: SecondPageProps;
}) => {
  // const SecondPage = () => {
  const [isLoadingEmotion, setLoadingEmotion] = useState<boolean>(
    !props.recommendedEmotion
  );
  const [loadingMessage, setLoadingMessage] = useState("Analyzing emotion...");

  useEffect(() => {
    if (props.recommendedEmotion) {
      setLoadingEmotion(false);
    } else {
      setLoadingEmotion(true);
      setLoadingMessage(
        "Analyzing the dataset and description to find the most appropriate emotion recommendation..."
      );
    }
  }, [props.recommendedEmotion]);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Conditionally render the LoadingSpinner over this page */}
        {isLoadingEmotion && <LoadingSpinner message={loadingMessage} />}
        {/* <!-- Left Column: Input Controls --> */}
        <section className="self-start lg:w-2/5 p-6 bg-white rounded-lg shadow-xl flex flex-col gap-y-5">
          <UserAgency
            props={{
              recommendedEmotion: props.recommendedEmotion || "",
              recommendedEmotionReason: props.recommendedEmotionReason || "",
              inappropriateEmotion: props.inappropriateEmotion || "",
              inappropriateEmotionReason:
                props.inappropriateEmotionReason || "",
            }}
          />
        </section>

        {/* <!-- Right Column: Summary and Visualization --> */}
        <section className="p-6 lg:w-3/5 bg-white rounded-lg shadow-xl flex flex-col gap-y-5 flex-grow">
          <Summary props={{ summaryText: props.summaryText }} />
        </section>
      </div>
    </>
  );
};

export default SecondPage;
