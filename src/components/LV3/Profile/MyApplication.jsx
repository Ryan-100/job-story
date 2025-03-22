import React, { useState } from "react";
import { Image as Icon } from "@/components/LV1";
import { useTheme } from "styled-components";
import Image from "next/image";
import { useGetUserApplicationQuery } from "@/store/modules/user/userModule";

const items = [
  {
    id: "1",
    title: "Project Mananger",
    company: "CITIBANK",
    applicants: 20,
    stage: "Interview",
    isActive: true,
  },
  {
    id: "1",
    title: "Project Mananger",
    company: "CITIBANK",
    applicants: 20,
    stage: "Interview",
    isActive: true,
  },
  {
    id: "1",
    title: "Project Mananger",
    company: "CITIBANK",
    applicants: 20,
    stage: "Interview",
    isActive: true,
  },
  {
    id: "1",
    title: "Project Mananger",
    company: "CITIBANK",
    applicants: 20,
    stage: "Interview",
    isActive: true,
  },
];

const options = [
  {
    icon: "withdraw",
    text: "Withdraw",
  },
  {
    icon: "trashBin",
    text: "Delete",
  },
];

const Option = ({ icon, text, onClose }) => {
  return (
    <li className="flex  items-start py-[10px] px-2 gap-4" onClick={onClose}>
      <Icon imageType={icon} width={20} height={20} />
      <span className="text-sm">{text}</span>
    </li>
  );
};

const Options = ({ onClose }) => {
  return (
    <ul
      className="flex flex-col p-2 w-[135px] absolute right-2 top-[30px] rounded-lg cursor-pointer"
      style={{
        boxShadow:
          "0px 3px 6px -3px rgba(23, 24, 24, 0.08), 0px 8px 20px -4px rgba(23, 24, 24, 0.12)",
      }}
    >
      {options.map((option) => (
        <Option {...option} onClose={onClose} key={option} />
      ))}
    </ul>
  );
};

const MyJob = (props) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const theme = useTheme();

  const handleToggleOptions = () => {
    setIsOptionsShown(!isOptionsShown);
  };

  const handleHideOptions = () => {
    setIsOptionsShown(false);
  };

  return (
    <li
      className="flex flex-row items-center px-4 py-6 gap-6"
      style={{
        boxShadow:
          "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Image
        className="rounded-[6px]"
        width={128}
        height={128}
        src={"/images/logo.svg"}
        // props.companyId?.logoId?.url
        alt={props.companyId.name}
      />
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between relative">
            {isOptionsShown && <Options onClose={handleHideOptions} />}
            <div className="flex flex-row items-center gap-2 ">
              <p className="font-bold text-sm leading-6">
                {props.jobId.jobTitle}
              </p>
              <div
                className="flex justify-center items-center py-[2px] px-[8px] w-[53px] h-[20px] rounded-full text-xs text-[#202223]"
                style={{
                  backgroundColor:
                    props.status === "active" ? theme.green350 : theme.red100,
                }}
              >
                {props.status === "active" ? "Active" : "Close"}
              </div>
            </div>
            <span
              className="flex justify-center items-center h-6 w-6 cursor-pointer"
              onClick={handleToggleOptions}
            >
              <Icon imageType="dotsVertical" width={4} height={16} />
            </span>
          </div>
          <p className="text-xs">{props.companyId.name}</p>
          <p className="text-xs text-[#6705DB]">
            {props.applicants?.length} applicants
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="flex items-start gap-0.5">
            <div className="w-4 h-[3px] bg-[#5C26D2] rounded-[10px]"></div>
            <div className="w-4 h-[3px] bg-[#5C26D2] rounded-[10px]"></div>
            <div className="w-4 h-[3px] bg-[#5C26D2] rounded-[10px]"></div>
            <div className="w-4 h-[3px] bg-[#5C26D2] rounded-[10px]"></div>
            <div className="w-4 h-[3px] bg-[#5C26D2] rounded-[10px]"></div>
          </div>
          <p className="text-xs">{props.stageId.name}</p>
        </div>
      </div>
    </li>
  );
};

const MyApplication = () => {
  const { data: userApplication } = useGetUserApplicationQuery();

  const currentUser = userApplication?.data;

  return (
    <ul className="flex flex-col gap-6">
      {currentUser &&
        currentUser?.map((user) => <MyJob {...user} key={user._id} />)}
    </ul>
  );
};

export default MyApplication;
