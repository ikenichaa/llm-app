import { useState } from "react";
import type { ChangeEvent } from "react";

import File from "../components/File";
import FileUpload from "../components/FileUpload";

interface UploadProp {
  fileEmitter: (file: File) => void;
  descriptionEmitter: (description: string) => void;
  file: File | null;
  description: string;
  activeStep: string;
}

const UploadStep = ({
  props = {
    fileEmitter: () => {},
    descriptionEmitter: () => {},
    file: null,
    description: "",
    activeStep: "",
  },
}: {
  props: UploadProp;
}) => {
  const [localDescription, setDescription] = useState<string>(
    props.description
  );

  const fileUploaderSendFile = (file: File) => {
    props.fileEmitter(file);
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

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    setDescription(description);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Upload File
        </h3>

        <UploadSection
          file={props.file}
          fileUploaderSendFile={fileUploaderSendFile}
        />
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          File Description
        </h3>
        <textarea
          id="message"
          className="block p-2.5 h-40 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Describe your dataset and specify what you want the story to focus on..."
          value={localDescription}
          onChange={handleDescriptionChange}
          onBlur={() => props.descriptionEmitter(localDescription)}
        ></textarea>
      </div>
    </>
  );
};

export default UploadStep;
