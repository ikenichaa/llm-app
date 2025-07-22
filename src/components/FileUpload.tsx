import type { ChangeEvent } from "react";

import { FaFileUpload } from "react-icons/fa";

interface FileUploadProps {
  fileUploaderSendFile: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ fileUploaderSendFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      fileUploaderSendFile(files[0]); // Emit the first selected file to the parent
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaFileUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              time-series CSV file
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
