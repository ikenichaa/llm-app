const EmotionStep = () => {
  const emotionList = [
    {
      id: "1",
      name: "happy",
    },
    {
      id: "2",
      name: "sad",
    },
    {
      id: "3",
      name: "fear",
    },
    {
      id: "4",
      name: "joy",
    },
    {
      id: "5",
      name: "nostalgic",
    },
  ];

  const emotionListUI = () => {
    return (
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {emotionList.map((emotion) => (
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id={emotion.id}
                type="radio"
                value=""
                name={emotion.name}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              ></input>
              <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {emotion.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col ">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Select Emotions
            </h3>
          </div>
          <div>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  ></input>
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Driver License{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-id"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  ></input>
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    State ID
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-military"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  ></input>
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    US Military
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-passport"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  ></input>
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    US Passport
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmotionStep;
