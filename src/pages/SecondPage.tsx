import { useState, useEffect } from "react";

import { Modal, ModalBody } from "flowbite-react";

import UserAgency from "../components/UserAgency";
import type { GenerateNarrativePayload as generatePayload } from "../api/generateNarrative";
import Summary from "../components/Summary";
import { generateAffectiveNarrative } from "../api/generateNarrative";

interface SecondPageProps {
  recommendedEmotion?: string;
  recommendedEmotionReason?: string;
  inappropriateEmotion?: string;
  inappropriateEmotionReason?: string;
  summaryText?: string;
  sessionId: string;
  visualizationImages: string[];
}

const LoadingModal = () => {
  return (
    <Modal show={true} size="md" popup={true}>
      <ModalBody className="w-full">
        <div className="flex flex-col items-center p-8">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Finding the most appropriate emotion recommendation...
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

const SecondPage = ({
  props = {
    recommendedEmotion: "",
    recommendedEmotionReason: "",
    inappropriateEmotion: "",
    inappropriateEmotionReason: "",

    summaryText: "",
    sessionId: "",
    visualizationImages: [],
  },
}: {
  props: SecondPageProps;
}) => {
  // const SecondPage = () => {
  const [isLoadingEmotion, setLoadingEmotion] = useState<boolean>(
    !props.recommendedEmotion
  );

  const [isGeneratingNarrative, setGeneratingNarrative] =
    useState<boolean>(false);

  const handleClickGenerate = (p: generatePayload) => {
    console.log("[handleClickGenerate] Generating with payload...", p);
    generateAffectiveNarrative(props.sessionId, p);
    setGeneratingNarrative(true);
  };

  useEffect(() => {
    if (props.recommendedEmotion) {
      setLoadingEmotion(false);
    } else {
      setLoadingEmotion(true);
    }
  }, [props.recommendedEmotion]);

  useEffect(() => {
    if (
      props.summaryText !== "" &&
      (props.visualizationImages?.length ?? 0) > 0
    ) {
      setGeneratingNarrative(false);
    }
  }, [props.summaryText, props.visualizationImages]);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Conditionally render the LoadingSpinner over this page */}
        {isLoadingEmotion && <LoadingModal />}
        {/* <!-- Left Column: Input Controls --> */}
        <section className="self-start lg:w-2/5 p-6 bg-white rounded-lg shadow-xl flex flex-col gap-y-5">
          <UserAgency
            props={{
              recommendedEmotion: props.recommendedEmotion || "",
              recommendedEmotionReason: props.recommendedEmotionReason || "",
              inappropriateEmotion: props.inappropriateEmotion || "",
              inappropriateEmotionReason:
                props.inappropriateEmotionReason || "",
              emitClickGenerate: handleClickGenerate,
            }}
          />
        </section>

        {/* <!-- Right Column: Summary and Visualization --> */}
        <section
          className={`lg:w-1/2 p-6 bg-white rounded-lg shadow-xl flex flex-col gap-y-6 relative`}
        >
          {/* Overlay to make it unclickable and visually faded */}
          {!isGeneratingNarrative && props.summaryText == "" && (
            <div className="absolute inset-0 bg-gray-300 bg-opacity-60 rounded-lg flex items-center justify-center text-gray-700 text-xl font-semibold opacity-55"></div>
          )}
          <Summary
            props={{
              summaryText: props.summaryText,
              isGeneratingNarrative: isGeneratingNarrative,
              visualizationImages: props.visualizationImages,
            }}
          />
        </section>
      </div>
    </>
  );
};

export default SecondPage;
