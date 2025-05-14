import { useState } from "react";

import File from "../components/File";
import FileUpload from "../components/FileUpload";

const HomePage = () => {
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
      <div className="grid my-8 mx-8 gap-y-10">
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
        </div>
        {/* <File /> */}
      </div>
    </>
  );
};

export default HomePage;
