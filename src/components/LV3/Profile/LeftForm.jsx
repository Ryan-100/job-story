import React, { useEffect, useState } from "react";
import { Text, Image } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import AlertModal from "@/components/LV2/Modal/AlertModal";
import ConfirmModal from "@/components/LV2/Modal/ConfirmModal";
import { useSelector } from "react-redux";
import { useMultipleResumesMutation } from "@/store/modules/file/fileModule";

const LeftForm = () => {
  const user = useSelector((state) => state.user.userDetails?.data);
  const [ID, setID] = useState();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(user?.resumes);

  const [multipleResumes] = useMultipleResumesMutation();

  // const { data: userData } = useGetMeQuery(); //fetching user's application data

  // const user = userData?.data;

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setIsUploading(true);

    setSelectedFiles((p) => [...p, ...files]);
    setIsUploaded(true);
  };
  const formData = new FormData();

  useEffect(() => {
    if (isUploaded) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("resume", selectedFiles[i]);
      }
    }
  }, [isUploaded]);

  const removeFile = (id) => {
    setSelectedFiles((p) => p.filter((file) => file.id !== id));
    setIsRemoving(false);
  };

  // console.log(formData);

  return (
    <div
      className="rounded-lg p-4 bg-slate-200 lg:col-span-4 mb-6 col-span-12 flex flex-col items-center space-y-4 w-full"
      style={{ height: "content-fit" }}
    >
      <div className="relative flex flex-col">
        <div className="rounded-full bg-gray-300 p-2">
          <Image imageType="profileIcon" width="50" height="50" />
        </div>
        <div className="self-end -mt-5 rounded-full bg-white w-6 h-6 flex items-center justify-center">
          <Image className="" imageType="edit" width="14" height="14" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Text weight="xl">{user?.name}</Text>
        <Text color="neutral400">{user?.email}</Text>
      </div>
      <div className="w-full space-y-4">
        <Text weight="lg" className="text-start">
          Documents
        </Text>

        {selectedFiles?.length > 0 &&
          selectedFiles?.map((doc) => (
            <div className="rounded-lg border border-slate-300 p-2 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="border border-slate-300 rounded-lg px-2">
                  <Image imageType="document" width="18" />
                </div>
                <div className="">
                  <Text>{doc.name}</Text>
                  <Text weight="xs" color="neutral400" size="xs">
                    {doc.size}KB
                  </Text>
                </div>
              </div>
              <Image
                imageType="close"
                width="14"
                className="cursor-pointer"
                onClick={() => {
                  setIsRemoving(true);
                  setID(doc.id);
                }}
              />
            </div>
          ))}
      </div>
      <Button variant="outlined" as="label">
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          hidden
        />
        <Text color="primary">+ Add Document</Text>
      </Button>
      <AlertModal
        open={isUploading}
        onClose={setIsUploading}
        description="Your resume is uploading"
        buttonText="Cancel"
        icon="loading"
      />
      <AlertModal
        open={isUploaded}
        onClose={setIsUploaded}
        title="Success!"
        description="Your document has been successfully uploaded!"
        buttonText="Back"
        icon="success"
      />

      <ConfirmModal
        open={isRemoving}
        onClose={setIsRemoving}
        onConfirm={() => removeFile(ID)}
        title="Remove the document"
        description="Are you sure you want to remove this document?"
      />
    </div>
  );
};

export default LeftForm;
