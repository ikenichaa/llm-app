import { useState, useRef, useEffect } from "react";
import { Card } from "flowbite-react";
import Toggle from "../components/Toggle";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

interface PythonCodeBlockProps {
  code: string;
}

interface summaryProp {
  summaryText: string;
}

const SummaryStep = ({
  props = { summaryText: "" },
}: {
  props: summaryProp;
}) => {
  const [toggleCode, setToggleCode] = useState<boolean>(false);
  const handleToggleEmitter = (status: boolean) => {
    setToggleCode(status);
  };

  const visualization = [
    {
      key: "1",
      image: "/src/assets/mock-graph-1.png",
      code: `import matplotlib.pyplot as plt

      # Sample data
      x = [1, 2, 3, 4, 5]
      y = [2, 4, 1, 5, 3]

      # Create a simple line plot
      plt.plot(x, y)

      # Add labels and title
      plt.xlabel("X-axis")
      plt.ylabel("Y-axis")
      plt.title("Simple Line Plot")

      # Display the plot
      plt.show()
    `,
    },
    {
      key: "2",
      image: "/src/assets/mock-graph-2.png",
      code: `import matplotlib.pyplot as plt

      # Sample data
      x = [1, 2, 3, 4, 5]
      y = [2, 4, 1, 5, 3]

      # Create a simple line plot
      plt.plot(x, y)

      # Add labels and title
      plt.xlabel("X-axis")
      plt.ylabel("Y-axis")
      plt.title("Simple Line Plot")

      # Display the plot
      plt.show()
    `,
    },
  ];

  const PythonCodeBlock: React.FC<PythonCodeBlockProps> = ({ code }) => {
    const codeRef = useRef<HTMLElement>(null); // Ref to the <code> element

    useEffect(() => {
      if (codeRef.current) {
        hljs.highlightElement(codeRef.current);
      }
    }, [code]);

    return (
      <div className="bg-black text-white p-2 rounded-md block whitespace-pre">
        <code ref={codeRef} className="language-python">
          {code}
        </code>
      </div>
    );
  };

  const VisualizationObject = () => {
    const cardObjects = visualization.map((viz) => (
      <Card key={viz.key} className="mb-4">
        <img
          className="h-auto max-w-full rounded-lg"
          src={viz.image}
          alt={`Visualization ${viz.key}`}
        />
      </Card>
    ));

    return cardObjects;
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Summary
          </h3>
          <p className="text-justify">{props.summaryText}</p>
        </div>
        <div className="grid gap-y-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Visualisation
            </h3>
            <Toggle
              props={{
                text: "Show the code",
                toggleStatus: toggleCode,
                emitChecked: handleToggleEmitter,
              }}
            />
          </div>
          {!toggleCode && <VisualizationObject />}

          {toggleCode &&
            visualization.map((item) => (
              <PythonCodeBlock key={item.key} code={item.code} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SummaryStep;
