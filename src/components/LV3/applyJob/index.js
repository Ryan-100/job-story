//* npm imports
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import moment from "moment";

//* project imports
import { Image, Text } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import { getToken } from "@/service";
import {
  useCreateJobMutation,
  useFetchJobByIdQuery,
} from "@/store/modules/jobs/jobsModules";
import ApplyFormOne from "./ApplyFormOne";
import ApplyFormTwo from "./ApplyFormTwo";
import PreviewModal from "./previewModal";
import { useFetchFileByIdQuery } from "@/store/modules/file/fileModule";
import ApplyJobSuccess from "@/components/LV3/applyJob/ApplyJobSuccess";

const ApplyJob = () => {
  const router = useRouter();
  const jobId = router.query?.jobId?.toString();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [showForm, setShowForm] = useState(1);
  const [finalData, setFinalData] = useState(null);
  const [bannerPath, setBannerPath] = useState(null);
  const [logoPath, setLogoPath] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: bannerUrl } = useFetchFileByIdQuery({ id: bannerPath });
  const { data: logoUrl } = useFetchFileByIdQuery({ id: logoPath });
  const [applyJob, { isLoading: isApplying }] = useCreateJobMutation();
  const theme = useTheme();

  const { data: jobData, isFetching } = useFetchJobByIdQuery({
    id: jobId,
    token: token,
    params: { populate: "experienceLevelId,jobTypeId,companyId" },
  });

  useEffect(() => {
    if (jobData?.data) {
      const fetch = async () => {
        if (jobData?.data?.applicationForm?.bannerId) {
          setBannerPath(jobData.data.applicationForm.bannerId);
        }
        if (jobData?.data?.applicationForm?.logoId) {
          setLogoPath(jobData.data.applicationForm.logoId);
        }
      };
      fetch();
    }
  }, [jobData, dispatch]);

  useEffect(() => {
    if (window) {
      const token = getToken();
      setToken(token);
    }
  }, []);

  const onSubmit = async (customQuestionData) => {
    const customSection = {
      name: "Custom Questions",
      questions: customQuestionData,
    };
    const personalSection = {
      name: "Personal Info",
      questions: getPersonalInfoFormResponse(finalData),
    };
    const applicantSection = {
      name: "Applicant Profile",
      questions: getApplicantProfileFormResponse(finalData),
    };
    const formResponse = {
      formResponse: [personalSection, applicantSection, customSection],
    };
    const data = { jobId, ...formResponse, ...finalData };
    const res = await applyJob({ token, data });
    console.log(res);
    if (res.data.status === "success") {
      setIsSuccess(true);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {isFetching ? (
        <div className="w-full flex justify-center items-center h-[1000px]">
          <Image
            imageType="loading"
            width={40}
            height={40}
            color={theme.primary}
            fillColor={theme.primary}
          />
        </div>
      ) : (
        <>
          {!isFetching && isSuccess ? (
            <ApplyJobSuccess />
          ) : (
            <div>
              <StyledDiv className="invisible lg:visible w-full h-screen" />
              <div className="w-full lg:w-[600px] mx-auto pt-14 lg:pt-40 pb-40 p-3 relative">
                <div
                  className="w-[80px] lg:w-[100px] h-[80px] lg:h-[100px] -mt-[40px] lg:-mt-[50px] border-2 bg-slate-500
               rounded-full absolute left-[50%] -translate-x-[50%] z-10 "
                >
                  {!!logoUrl?.data?.url && (
                    <img
                      src={logoUrl?.data?.url}
                      alt="logo"
                      className="h-full w-full rounded-full object-fill object-center "
                    />
                  )}
                </div>
                <div className="w-full h-[200px] bg-slate-400 relative">
                  {!!bannerUrl?.data?.url && (
                    <img
                      src={bannerUrl?.data?.url}
                      alt="logo"
                      className="h-full w-full object-fill object-center"
                    />
                  )}
                </div>
                <div className="p-4 bg-white">
                  <div className="mb-5">
                    <p className="text-xl font-bold flex items-center gap-3 ">
                      {jobData?.data?.jobTitle}
                    </p>
                    <Text className="text-slate-500">
                      {jobData?.data?.location?.city} • 11 applicants
                    </Text>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Image
                          imageType="clock"
                          color="#5C26D2"
                          fillColor="#5C26D2"
                          width={24}
                          height={24}
                        />

                        <p>
                          {jobData?.data?.jobTypeId[0]?.name} •{" "}
                          {jobData?.data?.jobOpening}{" "}
                          {+jobData?.data?.jobOpening > 1
                            ? "role openings"
                            : "role opening"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          imageType="calendar"
                          color="#5C26D2"
                          fillColor="#5C26D2"
                          width={24}
                          height={24}
                        />
                        <p>
                          {moment(jobData?.data?.updatedAt).format(
                            "MMMM, Do, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        bgcolor={theme.violet300}
                        onClick={() => setIsModalVisible(true)}
                      >
                        <p style={{ color: theme.primary }}>View Detail</p>
                      </Button>
                    </div>
                  </div>
                  {/* <div className="my-5 border-b"/>
                                <div>
                                    <Button fullWidth>Apply with Juncture Account</Button>
                                </div> */}
                </div>

                {showForm === 1 ? (
                  <ApplyFormOne
                    applicationForm={jobData?.data.applicationForm}
                    setShowForm={setShowForm}
                    setFinalData={setFinalData}
                  />
                ) : (
                  <ApplyFormTwo
                    applicationForm={jobData?.data.applicationForm}
                    setShowForm={setShowForm}
                    setFinalData={setFinalData}
                    onSubmit={onSubmit}
                    isApplying={isApplying}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}

      <PreviewModal
        jobData={jobData}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </div>
  );
};

export default ApplyJob;

const StyledDiv = styled.div`
  position: absolute;
  background-image: url("/images/apply-job-bannar.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  background-attachment: scroll;
`;

const getPersonalInfoFormResponse = (data) => {
  let questions = [];

  for (const key in data) {
    console.log(key);
    if (key === "gender") {
      questions.push({ question: "Gender", answer: data[key] });
    }

    if (key === "maritalStatus") {
      questions.push({ question: "Marital Status", answer: data[key] });
    }

    if (key === "dob") {
      questions.push({ question: "Date of Birth", answer: data[key] });
    }

    if (key === "nationality") {
      questions.push({ question: "Nationality", answer: data[key] });
    }

    if (key === "eduLevel") {
      questions.push({
        question: "Highest Education Level",
        answer: data[key],
      });
    }

    if (key === "jobPostFound") {
      questions.push({
        question: "Where did you find this job post?",
        answer: data[key],
      });
    }
    if (key === "location") {
      questions.push({ question: "Location", answer: data[key] });
    }
  }
  return questions;
};

const getApplicantProfileFormResponse = (data) => {
  let questions = [];

  for (const key in data) {
    if (key === "workStartDate") {
      questions.push({
        question: "Earliest avaliabilty for work",
        answer: data[key],
      });
    }
  }
  return questions;
};
