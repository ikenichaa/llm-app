import { FaFileCsv } from "react-icons/fa";
import React from "react";

interface FileProps {
  name: string;
  size: GLfloat;
}

const File: React.FC<FileProps> = ({ name = "Untitled", size = "N/A" }) => {
  return (
    <>
      <div className="flex justify-between my-2.5 bg-gray-50 rounded-xl p-2 w-1/2">
        <div className="me-2">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 pb-2">
            <FaFileCsv className="h-10 w-10" />
            {name}
          </span>
          <span className="flex text-xs font-normal text-gray-500 :text-gray-400 gap-2">
            {size} byte
          </span>
        </div>
      </div>
    </>
  );
};

export default File;
