import { Image, Text } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import { InputRadioGroup, InputText } from "@/components/LV2/Inputs";
import Modal from "@/components/LV2/Modal/Modal";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useForm } from "react-hook-form";

const PriorRequest = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [progress, setProgress] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const theme = useTheme();

  const { control, watch } = useForm();

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const handleFileInputChange = (event) => {
    setTimeout(() => {
      setProgress(100);
    }, 3000);
    const file = event.target.files[0];
    const fileName = {
      name: file?.name,
      size: file?.size,
      id: file?.lastModified,
    };
    setSelectedID(fileName.id);
    setSelectedFile((p) => [fileName, ...p]);
    setTimeout(() => {
      setProgress(0);
    }, 4500);
  };

  const progressStyles = {
    backgroundColor: theme.blue200,
    height: "100%",
    width: `${progress}%`,
    transition: "width 0.2s ease-in",
  };

  const appType = watch("application_type");

  useEffect(() => {
    if (appType === "specific") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [appType]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-[610px] self-center border-2 mt-16 rounded-lg flex flex-col bg-white">
        <div className="flex justify-between items-center py-2 px-4">
          <Text size="lg">Prior Request</Text>
          <Image
            imageType="close"
            width="16"
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className=" flex flex-col space-y-4 border border-l-transparent border-r-transparent p-5">
          <div className="flex items-center self-center">
            <Image
              imageType={nextStep ? "completed" : "undone"}
              fillColor={nextStep ? theme.primary : theme.white}
            />
            <hr
              style={{
                backgroundColor: nextStep ? theme.primary : theme.neutral400,
                width: 150,
                height: 1,
              }}
            />
            <Image
              imageType={nextStep ? "undone" : "circle"}
              fillColor={theme.white}
            />
          </div>
          {nextStep ? (
            <div className="flex flex-col space-y-4">
              <Text size="lg" weight="xxl">
                Select CV
              </Text>
              {selectedFile?.length > 0 && (
                <>
                  <div className="border rounded-lg p-2">
                    {selectedFile.map((file, i) => (
                      <div
                        key={i}
                        className="rounded-lg  p-2 flex justify-between items-center"
                      >
                        <div className="flex space-x-2">
                          <div className="border border-slate-300 rounded-lg px-2">
                            <Image imageType="document" width="18" />
                          </div>
                          <div className="">
                            <Text>{file.name}</Text>
                            <Text weight="xs" color="neutral400" size="xs">
                              {file.size}KB
                            </Text>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor:
                              selectedID === file.id ? theme.green150 : "",
                          }}
                          className="border py-1 cursor-pointer px-4 rounded-lg "
                          onClick={() => {
                            setSelectedID(file.id);
                          }}
                        >
                          {selectedID === file.id ? (
                            <div className="flex items-center space-x-1">
                              <Image
                                imageType="correct"
                                width={18}
                                height={18}
                              />
                              <Text>Selected</Text>
                            </div>
                          ) : (
                            <Text>Select</Text>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Text className="text-center">or</Text>
                </>
              )}
              <div className="relative border border-dashed rounded-lg py-6 flex flex-col items-center overflow-hidden">
                <div
                  style={progressStyles}
                  className="absolute top-0 left-0 w-full h-full -z-10 transition-all"
                />
                <Button bgcolor={theme.blue80} as="label">
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    hidden
                  />
                  <Text color="blue450"> Upload CV</Text>
                </Button>
                <Text color="neutral400">.doc, .docx, .pdf (2MB)</Text>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 ">
              <Text size="lg" weight="xxl">
                Type of Application
              </Text>
              <HorizontalRadioChecks>
                <InputRadioGroup
                  style={{ display: "flex" }}
                  control={control}
                  name="application_type"
                  options={radioOption}
                  error="error"
                />
              </HorizontalRadioChecks>
              <div>
                <Text>
                  Job Title <span className="required">*</span>
                </Text>
                <ReactSelectDropDown
                  control={control}
                  name="jobTitle"
                  options={options}
                  disabled={isDisabled}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Text size="lg" weight="xxl">
                  Personal Info
                </Text>
                <div className="items-center">
                  <Text>
                    Username<span className="required">*</span>
                  </Text>
                  <InputText
                    placeholder="Enter Your Username"
                    control={control}
                    name="username"
                    // error={errors?.username?.message}
                    width="296px"
                  />
                </div>
                <div className="items-center">
                  <Text>
                    Password<span className="required">*</span>
                  </Text>
                  <InputText
                    placeholder="Enter Your Password"
                    control={control}
                    name="password"
                    // error={errors?.password?.message}
                    width="296px"
                    type={showPass ? "text" : "password"}
                    onClick={handleTogglePass}
                    showPass={showPass}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex self-end space-x-2 px-4 py-2">
          <Button size="md" type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button size="md" type="button" onClick={() => setNextStep(true)}>
            {nextStep ? "Submit" : "Continue"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PriorRequest;

const HorizontalRadioChecks = styled.div`
  & > div {
    margin-top: 5px;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 17px;
  }

  & > input {
    color: ${(props) => props.theme.blue400} !important;
    border: 1px solid ${(props) => props.theme.blue400} !important;
  }
`;

const radioOption = [
  { label: "General", value: "general" },
  { label: "Specific", value: "specific" },
];

const options = [
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "Office Staff", label: "Office Staff" },
  { value: "Android developer", label: "Android developer" },
];
