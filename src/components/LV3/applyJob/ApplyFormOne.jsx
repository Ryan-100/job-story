import React, {useEffect, useState} from "react";
import {DatePickerInput, InputRadioGroup, InputText, InputTextArea,} from "@/components/LV2/Inputs";
import {useForm} from "react-hook-form";
import styled, {useTheme} from "styled-components";
import {Button} from "@/components/LV2/Button";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Text} from "@/components/LV1";
import {getToken} from "@/service";
import axios from "axios";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

const jobSchema = yup.object().shape({
    //? need intro validation
    name: yup.string().required("please enter your name"),
    email: yup.string().email().required("please enter email"),
    phoneNumber: yup
        .string()
        .required("enter phone number")
        .matches(phoneRegExp, "phone number is not valid")
        .min(5, "too short")
        .max(20, "too long"),
});

const getFormValue = (obj) => {
    return obj?.value;
};

const ApplyFormOne = ({applicationForm, setFinalData, setShowForm}) => {
    const theme = useTheme();
    const [token, setToken] = useState(null);
    const [personalInputs, setPersonalInputs] = useState();
    const [profileInputs, setProfileInputs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState();
    const [resumeFile, setResumeFile] = useState(null);

    const [resumeFail, setResumeFail] = useState(false);

    const isObject = (value) =>
        typeof value === "object" && typeof value[0] === "object";

    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(jobSchema),
    });

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token);
        }
    }, []);

    const onSubmit = async (data) => {
        let fileId;
        let coverLetterId;
        setIsLoading(true);
        if (data.resumeFile.length > 0) {
            let formData = new FormData();
            formData.append("resume", data.resumeFile?.[0]);

            const res = await axios.post('https://juncturedev.xyz/api/v1/file', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.status === "success") {
                fileId = res.data.data[0]._id;

            } else {
                setResumeFail(true);

                return;
            }
        }

        if (data.resumeFile.length === 0) {
            return;
        }

        if (data?.coverLetterFile?.length > 0) {
            let formData = new FormData();
            formData.append('cover-letter', data.coverLetterFile?.[0]);
            setIsLoading(true)
            const res = await axios.post('https://juncturedev.xyz/api/v1/file', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.data.status === "success") {
                coverLetterId = res.data.data[0]._id;
            }

        }
        setIsLoading(false)

        const formOneData = {
            ...data,
            prefixQuestion: getFormValue(data?.prefixQuestion),
            nationality: getFormValue(data?.nationality),
            location: getFormValue(data?.location),
            eduLevel: getFormValue(data?.eduLevel),
            jobPostFound: getFormValue(data?.jobPostFound),
            resumeId: fileId,
            gender: !data.gender ? 'Prefer not to say' : data.gender,
            ...(coverLetterId && {coverLetterId}),
        };
        setFinalData(prevData => ({...prevData, ...formOneData}));
        setShowForm(2);
    };

    useEffect(() => {
        if (applicationForm?.sections) {
            const personalInputs = applicationForm?.sections
                .find((section) => section.sectionName === "Personal Info")
                ?.inputs.map((input) => ({label: input.label, status: input.status}));
            const profileInputs = applicationForm?.sections
                .find((section) => section.sectionName === "Applicant Profile")
                ?.inputs.map((input) => ({label: input.label, status: input.status}));

            setPersonalInputs(personalInputs);
            setProfileInputs(profileInputs);
        }
    }, [applicationForm]);

    const watchCoverLetter = watch("coverLetterFile");
    const watchResumeFile = watch("resumeFile");

    useEffect(() => {
        if (isObject(watchCoverLetter)) {
            setCoverLetter(watchCoverLetter[0]);
        }
        if (isObject(watchResumeFile)) {
            setResumeFile(watchResumeFile[0]);
        }
    }, [watchCoverLetter, watchResumeFile]);

    return (
        <>
            <div className="bg-white p-4">
                <p style={{color: theme.primary}}>STEP 1/2</p>
                <p className="text-xl font-bold my-7">Apply for this job</p>

                <form>
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div
                                className="w-[40px] h-[40px] flex justify-center items-center bg-violet-300 rounded-full ">
                                <span className="text-violet-700">1</span>
                            </div>
                            Introduction
                        </h2>
                        <div>
                            <InputTextArea control={control} name="introduction"/>
                        </div>

                        <br/>

                        <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div
                                className="w-[40px] h-[40px] flex justify-center items-center bg-violet-300 rounded-full ">
                                <span className="text-violet-700">2</span>
                            </div>
                            Personal Information
                        </h2>

                        <>
                            {personalInputs?.map((input, key) => {
                                return (
                                    <div>
                                        {input.label === "Name" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>
                                                    Name <span style={{color: theme.red500}}> * </span>
                                                </p>
                                                <InputText
                                                    key={key}
                                                    control={control}
                                                    name="name"
                                                    error={errors?.name?.message}
                                                    placeholder="Name"
                                                />
                                            </div>
                                        ) : null}

                                        {input.label === "Mail" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>
                                                    Mail <span style={{color: theme.red500}}> * </span>
                                                </p>

                                                <InputText
                                                    key={key}
                                                    control={control}
                                                    name="email"
                                                    error={errors?.email?.message}
                                                    placeholder="Email"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Phone Number" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>
                                                    Phone Number
                                                    <span style={{color: theme.red500}}> * </span>
                                                </p>
                                                <InputText
                                                    key={key}
                                                    control={control}
                                                    error={errors?.phoneNumber?.message}
                                                    name="phoneNumber"
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Prefix Question" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Prefix Question</p>
                                                <ReactSelectDropDown
                                                    control={control}
                                                    name="prefixQuestion"
                                                    options={prefixOptions}
                                                    placeholder="Prefix Question"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" && input.label === "Gender" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Gender</p>
                                                <HorizontalRadioChecks>
                                                    <InputRadioGroup
                                                        control={control}
                                                        name="gender"
                                                        options={genderOptions}
                                                    />
                                                </HorizontalRadioChecks>
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Marital Status" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Marital Status</p>
                                                <HorizontalRadioChecks className="lj">
                                                    <InputRadioGroup
                                                        control={control}
                                                        name="maritalStatus"
                                                        options={maritalStatusOptions}
                                                    />
                                                </HorizontalRadioChecks>
                                            </div>
                                        ) : null}

                                        {input.status !== "off" && input.label === "NRC" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>NRC</p>
                                                <InputText
                                                    control={control}
                                                    name="nrc"
                                                    placeholder=" "
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Date of Birth" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Date of Birth</p>
                                                <DatePickerInput control={control} name="dob" onChange={() => {
                                                }}/>
                                            </div>
                                        ) : null}

                                        {input.status !== "off" && input.label === "Nationality" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Nationality</p>

                                                <ReactSelectDropDown
                                                    control={control}
                                                    name="nationality"
                                                    options={nationalityOptions}
                                                    placeholder="Nationality"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" && input.label === "Location" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Location</p>
                                                <ReactSelectDropDown
                                                    control={control}
                                                    name="location"
                                                    options={locationOptions}
                                                    placeholder="Location"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Highest Education Level" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Highest Education Level</p>
                                                <ReactSelectDropDown
                                                    control={control}
                                                    name="eduLevel"
                                                    options={eduLevelOptions}
                                                    placeholder="Highest Education"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" && input.label === "Address" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Address</p>
                                                <InputText
                                                    control={control}
                                                    name="address"
                                                    placeholder="Address"
                                                />
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Where did you find this job post?" ? (
                                            <div className="space-y-1 mb-4" key={key}>
                                                <p>Where did you find this job post?</p>
                                                <ReactSelectDropDown
                                                    control={control}
                                                    name="jobPostFound"
                                                    options={jobPostOptions}
                                                    placeholder="Job Found"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </>

                        <br/>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div
                                className="w-[40px] h-[40px] flex justify-center items-center bg-violet-300 rounded-full ">
                                <span className="text-violet-700">3</span>
                            </div>
                            Applicant Profile
                        </h2>

                        <>
                            {profileInputs?.map((input, key) => {
                                return (
                                    <div key={key}>
                                        {input.label === "Cover Letter" &&
                                        input.status !== "off" ? (
                                            <div key={key} className="mb-4">
                                                <div className="space-y-2">
                                                    <p>Attach your cover letter</p>

                                                    {!coverLetter && (
                                                        <div className="w-fit">
                                                            <label className="cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    {...register("coverLetterFile")}
                                                                    hidden
                                                                />
                                                                <div

                                                                    style={{
                                                                        color: theme.primary,
                                                                        backgroundColor: theme.violet300,
                                                                    }}
                                                                    className="p-2 rounded-lg"
                                                                >
                                                                    <p>Upload file</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>

                                                {coverLetter && (
                                                    <div className={`space-y-2`}>
                                                        <div
                                                            className="flex justify-between items-center py-1 px-2 rounded"
                                                            style={{backgroundColor: theme.violet200}}
                                                        >
                                                            <div className="flex gap-1">
                                                                <p>{coverLetter.name}</p>
                                                                <p>{`(${coverLetter.size})K`}</p>
                                                            </div>

                                                            <Button
                                                                size="sm"
                                                                className="shadow"
                                                                onClick={() => setCoverLetter(null)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : null}

                                        {input.label === "Resume" ? (
                                            <div key={key} className="mb-4">
                                                <div className="space-y-2">
                                                    <p>
                                                        Attach your resume{" "}
                                                        <span style={{color: theme.red500}}> * </span>
                                                    </p>

                                                    {!resumeFile && (
                                                        <div className="w-fit">
                                                            <label className="cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    {...register("resumeFile")}
                                                                    hidden
                                                                />
                                                                <div

                                                                    style={{
                                                                        color: theme.primary,
                                                                        backgroundColor: theme.violet300,
                                                                    }}
                                                                    className="p-2 rounded-lg"
                                                                >
                                                                    <p>Upload file</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>

                                                {resumeFile && (
                                                    <div className={`space-y-2`}>
                                                        <div
                                                            className="flex justify-between items-center py-1 px-2 rounded"
                                                            style={{backgroundColor: theme.violet200}}
                                                        >
                                                            <div className="flex gap-1">
                                                                <p>{resumeFile.name}</p>
                                                                <p>{`(${resumeFile.size})K`}</p>
                                                            </div>

                                                            <Button
                                                                size="sm"
                                                                className="shadow"
                                                                onClick={() => {
                                                                    setResumeFile(null);
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}

                                                {watchResumeFile?.length === 0 ? (
                                                    <Text color="red500" className="ml-1 mt-1">
                                                        Please add resume
                                                    </Text>
                                                ) : null}
                                            </div>
                                        ) : null}

                                        {input.status !== "off" &&
                                        input.label === "Earliest avaliabilty for work" ? (
                                            <div key={key}>
                                                <div className="space-y-1">
                                                    <p className="mb-2">Earliest avaliabilty for work</p>
                                                </div>

                                                <InputRadioGroup
                                                    control={control}
                                                    name="workStartDate"
                                                    options={workTimeOptions}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </>
                    </div>
                </form>
            </div>

            <div className="mt-5 flex justify-end">
                <Button
                    isLoading={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    variant="outlined"
                    bordercolor={theme.neutral400}
                    textcolor={theme.neutral600}
                >
                    Continue
                </Button>
            </div>
        </>
    );
};

export default ApplyFormOne;

const HorizontalRadioChecks = styled.div`
  & > div {
    margin-top: 5px;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 17px;
  }
`;

const prefixOptions = [
    {value: "Mrs", label: "Mrs"},
    {value: "Mr", label: "Mr"},
    {value: "Miss", label: "Miss"},
    {value: "Ms", label: "Ms"},
    {value: "Dr", label: "Dr"},
    {value: "Rev", label: "Rev"},
    {value: "Other", label: "Other"},
];

const nationalityOptions = [
    {value: "Myanmar", label: "Myanmar"},
    {value: "Thailand", label: "Thailand"},
    {value: "Indonesia", label: "Indonesia"},
    {value: "Singaporean", label: "Singaporean"},
    {value: "Others", label: "Others"},
];

const eduLevelOptions = [
    {value: "High School or equivalent", label: "High School or equivalent"},
    {
        value: "Technical or occupational certifcate",
        label: "Technical or occupational certifcate",
    },
    {value: "Associate degree", label: "Associate degree"},
    {
        value: "Some college coursework completed",
        label: "Some college coursework completed",
    },
    {value: "Bachelor's degree", label: "Bachelor's degree"},
    {value: "Master's degree", label: "Master's degree"},
    {value: "Doctorate", label: "Doctorate"},
    {value: "Professional", label: "Professional"},
];

const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
    {label: "Others", value: "Others"},
    {label: "Prefer not to say", value: "Prefer not to say"},
];

const maritalStatusOptions = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"},
    {label: "Other", value: "Other"},
];

const workTimeOptions = [
    {label: "Immediately", value: "Immediately"},
    {label: "1-2 weeks", value: "1-2 weeks"},
    {label: "2-4 weeks", value: "2-4 weeks"},
];

const locationOptions = [
    {
        value: "Yangon Region",
        label: "Yangon Region",
    },
    {
        value: "Mandalay Region",
        label: "Mandalay Region",
    },
    {
        value: "NayPyiTaw Region",
        label: "NayPyiTaw Region",
    },
    {
        value: "Ayeyawady Region",
        label: "Ayeyawady Region",
    },
    {
        value: "Bago Region",
        label: "Bago Region",
    },
    {
        value: "Chin State",
        label: "Chin State",
    },
    {
        value: "Kachin State",
        label: "Kachin State",
    },
    {
        value: "Kayah State",
        label: "Kayah State",
    },
    {
        value: "Kayin State",
        label: "Kayin State",
    },
    {
        value: "Magway Region",
        label: "Magway Region",
    },
    {
        value: "Mon State",
        label: "Mon State",
    },
    {
        value: "Rakhine State",
        label: "Rakhine State",
    },
    {
        value: "Sagaing Region",
        label: "Sagaing Region",
    },
    {
        value: "Shan State",
        label: "Shan State",
    },
    {
        value: "Taninthayi Regite",
        label: "Taninthayi Region",
    },
    {
        value: "Brunei",
        label: "Brunei",
    },
    {
        value: "Cambodia",
        label: "Cambodia",
    },
    {
        value: "Timor-Leste",
        label: "Timor-Leste",
    },
    {
        value: "Indonesia",
        label: "Indonesia",
    },
    {
        value: "Laos",
        label: "Laos",
    },
    {
        value: "Malaysia",
        label: "Malaysia",
    },
    {
        value: "Philippines",
        label: "Philippines",
    },
    {
        value: "Singapore",
        label: "Singapore",
    },
    {
        value: "Thailand",
        label: "Thailand",
    },
    {
        value: "Vietnam",
        label: "Vietnam",
    },
    {
        value: "Australia",
        label: "Australia",
    },
    {
        value: "UK",
        label: "UK",
    },
    {
        value: "USA",
        label: "USA",
    },
    {
        value: "Dubai",
        label: "Dubai",
    },
];

const jobPostOptions = [
    {
        value: "Facebook",
        label: "Facebook",
    },
    {
        value: "LinkedIn",
        label: "LinkedIn",
    },
    {
        value: "Twitter",
        label: "Twitter",
    },
    {
        value: "Instagram",
        label: "Instagram",
    },
    {
        value: "Personal Network",
        label: "Personal Network",
    },
    {
        value: "Referral",
        label: "Referral",
    },
    {
        value: "Career Fairs and Events",
        label: "Career Fairs and Events",
    },
    {
        value: "Online Job Portals",
        label: "Online Job Portals",
    },
    {
        value: "Newspaper and Media",
        label: "Newspaper and Media",
    },
    {
        value: "Others",
        label: "Others",
    },
];
