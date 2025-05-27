import { useState } from "react";

import { mockSummaryText } from "../constatnt/mock";

import UserAgency from "../components/UserAgency";
import Summary from "../components/Summary";

const SecondPage = () => {
  const [isLoadingEmotion, setLoadingEmotion] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const handleEmotionChange = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  return (
    <>
      <UserAgency
        props={{
          isLoading: isLoadingEmotion,
          emotion: selectedEmotion,
          emotionStepperEmitEmotion: handleEmotionChange,
        }}
      />

      <Summary props={{ summaryText: mockSummaryText }} />
    </>
  );
};

export default SecondPage;
