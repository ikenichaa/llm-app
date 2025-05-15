import { useState } from "react";

import File from "../components/File";
import FileUpload from "../components/FileUpload";

const UploadStep = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileUploaderSendFile = (fileData: File) => {
    setFile(fileData);
  };

  interface UploadSectionProps {
    file: File | null;
    fileUploaderSendFile: (file: File) => void;
  }

  function UploadSection({ file, fileUploaderSendFile }: UploadSectionProps) {
    if (file !== null) {
      return <File name={file.name} size={file.size} />;
    } else {
      return <FileUpload fileUploaderSendFile={fileUploaderSendFile} />;
    }
  }

  return (
    <>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Upload File
        </label>

        <UploadSection
          file={file}
          fileUploaderSendFile={fileUploaderSendFile}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
    </>
  );
};

export default UploadStep;
