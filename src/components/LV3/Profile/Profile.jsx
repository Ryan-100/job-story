import React, { useEffect, useState } from "react";
import { Text } from "@/components/LV1";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import LeftForm from "./LeftForm";
import MyApplication from "./MyApplication";
import Overview from "./Overview";
import Setting from "./Setting";
import {
  useGetMeQuery,
  useGetUserApplicationQuery,
  useGetUserDetailsQuery,
} from "@/store/modules/user/userModule";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  setUserApplicationData,
  setUserDetails,
} from "@/store/modules/user/user-slice";
import { getUserInfo } from "@/service";

const Profile = () => {
  // const user_redux = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const user = getUserInfo();
  const { data: userData, isLoading } = useGetMeQuery(); //fetching user's application data
  const { data: userDetails } = useGetUserDetailsQuery(user?._id);

  useEffect(() => {
    dispatch(setCurrentUser(userData));
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(setUserDetails(userDetails));
  }, [dispatch, userDetails]);

  // useEffect(() => {}, [user_redux]);

  // console.log(userDetails, "user cookies");
  // console.log(userData, "user data");

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="items-center w-full">
      <Text className="text-center my-6 pt-6" size="lg">
        My Profile
      </Text>
      <div className="grid grid-cols-12 gap-6 mx-[14%]">
        <LeftForm />
        <div className="rounded-lg bg-slate-200 p-4 lg:col-span-8 mb-6 col-span-12 border border-b-slate-400">
          <div className="flex space-x-6 lg:w-[60%] w-full">
            <TwText
              className={`${activeStep === 0 ? "active" : ""}`}
              onClick={() => setActiveStep(0)}
            >
              Overview
            </TwText>
            <TwText
              className={`${activeStep === 1 ? "active" : ""}`}
              onClick={() => setActiveStep(1)}
            >
              My application
            </TwText>
            <TwText
              className={`${activeStep === 2 ? "active" : ""}`}
              onClick={() => setActiveStep(2)}
            >
              Setting
            </TwText>
          </div>
          <div className="p-3">
            {activeStep === 0 && <Overview />}
            {activeStep === 1 && <MyApplication />}
            {activeStep === 2 && <Setting />}
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledText = styled.p`
  &.active {
    color: ${(props) => props.theme.primary};
    border-bottom: 1px solid ${(props) => props.theme.primary};
  }
`;

const TwText = tw(StyledText)`
  lg:p-3
  p-2 
  cursor-pointer
  text-xs
  lg:text-[14px]
`;

export default Profile;
