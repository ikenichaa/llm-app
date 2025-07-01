import { useState } from "react";

import { mockSummaryText } from "../constatnt/mock";

import UserAgency from "../components/UserAgency";
import Summary from "../components/Summary";

interface SecondPageProps {
  sessionId: string;
}

const SecondPage = ({
  props = {
    sessionId: "",
  },
}: {
  props: SecondPageProps;
}) => {
  const [isLoadingEmotion, setLoadingEmotion] = useState<boolean>(false);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* <!-- Left Column: Input Controls --> */}
        <section className="self-start lg:w-2/5 p-6 bg-white rounded-lg shadow-xl flex flex-col gap-y-5">
          <UserAgency
            props={{
              isLoading: isLoadingEmotion,
            }}
          />
        </section>

        {/* <!-- Right Column: Summary and Visualization --> */}
        <section className="p-6 lg:w-3/5 bg-white rounded-lg shadow-xl flex flex-col gap-y-5 flex-grow">
          <Summary props={{ summaryText: mockSummaryText }} />
        </section>
      </div>
    </>
  );
};

export default SecondPage;
