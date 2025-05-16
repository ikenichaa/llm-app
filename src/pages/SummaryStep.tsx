import { FaAngleRight } from "react-icons/fa";

interface summaryProp {
  summaryText: string;
}

const SummaryStep = ({
  props = { summaryText: "" },
}: {
  props: summaryProp;
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid p-6 gap-y-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl">Summary</h3>
          <p className="text-justify">{props.summaryText}</p>
        </div>
        <div className="grid gap-y-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl">Visualization</h3>
          <div className="grid gap-y-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="/src/assets/mock-graph.png"
                alt="image description"
              ></img>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Check out the code
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryStep;
