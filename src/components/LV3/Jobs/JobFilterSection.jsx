//* npm imports
// noinspection CssUnknownTarget

import {useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import styled, {useTheme} from "styled-components";
import {useRouter} from "next/router";

//* project imports
import {colors, Text} from "@/components/LV1";
import {Button} from "@/components/LV2/Button";
import {InputText} from "@/components/LV2/Inputs";
import BookmarkCard from "../common/cards/BookmarkCard";
import JobPagination from "./JobPagination";
import {Image as NativeImage} from "./../../LV1";
import {
    useFetchEmploymentTypeQuery,
    useFetchExperiencesQuery,
    useFetchIndustriesQuery,
    useFetchJobFunctionQuery,
    useFetchJobsQuery,
} from "@/store/modules/jobs/jobsModules";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import {getToken} from "@/service";

export const parseArray = (items) => {
    return items?.map((item) => ({
        value: item?._id,
        label: item?.name,
    }));
};

const JobFilterSection = () => {
    const router = useRouter();
    const {category, location, search} = router.query;
    const theme = useTheme();
    const bottomRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showClear, setShowClear] = useState(false);
    const [token, setToken] = useState(null);
    let [num, setNum] = useState(currentPage);
    const [searchParams, setSearchParams] = useState({
        select: "jobTitle,location,type,experienceLevelId,jobTypeId,companyId",
        populate: "experienceLevelId,jobTypeId,companyId",
        limit: 8,
        search: search,
        ["location.city"]: location,
        jobFunctionId: category
    });

    const {
        control: control,
        handleSubmit: handleSubmitSearch,
        watch,
        reset,
    } = useForm();

    const handleSearchFormSubmit = (data) => {
        const search = data.search;
        const industriesArray = data.industries.map((industry) => industry.value);
        const jobFunctionsArray = data.jobFunctions.map((jobFunc) => jobFunc.value);
        const cityArray = data.cityOrTown.map((city) => city.value);
        setSearchParams((prevParams) => ({
            ...prevParams,
            ...(industriesArray.length > 0 && {
                industryId: JSON.parse(JSON.stringify(industriesArray)).join(","),
            }),
            ...(jobFunctionsArray.length > 0 && {
                jobFunctionId: JSON.parse(JSON.stringify(jobFunctionsArray)).join(","),
            }),
            ...(cityArray.length > 0 && {
                ["location.city"]: JSON.parse(JSON.stringify(cityArray)).join(","),
            }),
            ...(!!search && {search: search}),
            ...(!!data?.postedDate && {postedDate: data?.postedDate?.value}),
            ...(!!data?.workType && {type: data?.workType?.value}),
            ...(!!data?.workExp && {experienceLevelId: data?.workExp?.value}),
            ...(!!data?.employmentType && {
                jobTypeId: data?.employmentType?.value,
            }),
        }));
        setCurrentPage(1);
    };

    const {data: jobTypes} = useFetchEmploymentTypeQuery();
    const {
        data: jobData,
        isLoading,
        isFetching,
    } = useFetchJobsQuery({
        query: {
            ...searchParams,
            page: currentPage,
        },
        token,
    });
    const {data: industries, isLoading: industriesLoading} = useFetchIndustriesQuery();
    const {data: experiences} = useFetchExperiencesQuery();
    const {data: jobFunctions, isLoading: jobFunctionsLoading} = useFetchJobFunctionQuery();

    const watchWorkExpSelect = watch("workExp");
    const watchWorkTypeSelect = watch("workType");
    const watchEmploymentSelect = watch("employmentType");
    const watchPostedDateSelect = watch("postedDate");
    const isInitialRef = useRef(true);

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token);
        }
    }, []);
    useEffect(() => {
        if (
            watchWorkExpSelect?.value ||
            watchWorkTypeSelect?.value ||
            watchEmploymentSelect?.value ||
            watchPostedDateSelect?.value
        ) {
            setShowClear(true);
        }
    }, [
        watchWorkExpSelect,
        watchWorkTypeSelect,
        watchEmploymentSelect,
        watchPostedDateSelect,
    ]);
    useEffect(() => {
        if (isInitialRef.current) {
            isInitialRef.current = false;
        }
    }, []);

    // clear all items inside multiple dropdowns
    const handleOnClear = (field) => {
        const searchParamsCopy = {...searchParams};
        for (const key in searchParamsCopy) {
            if (key === field) {
                delete searchParamsCopy[key];
            }
        }
        setSearchParams(searchParamsCopy);
    };

    // multiple dropdowns item remove handler
    const handleOnRemoveItem = (removedItem, field) => {
        const searchParamsCopy = {...searchParams};
        let keyToUpdate;

        if (field === "cityOrTown") {
            keyToUpdate = "location.city";
        } else if (field === "industries") {
            keyToUpdate = "industryId";
        } else if (field === "jobFunctions") {
            keyToUpdate = "jobFunctionId";
        }

        const splitArray = searchParamsCopy[keyToUpdate]?.split(",") ?? [];
        const updatedItemsArray = splitArray.filter((value) => value !== removedItem[0].value);
        const updatedItemsString = updatedItemsArray.join(",");

        if (updatedItemsArray.length > 0) {
            setSearchParams((prevState) => ({
                ...prevState,
                [keyToUpdate]: updatedItemsString,
            }));
        } else {
            handleOnClear(keyToUpdate);
        }
    };

    const clearFilterHandler = () => {
        reset({
            workExp: [],
            workType: [],
            employmentType: [],
            PostedDate: [],
        });

        setShowClear(false);
    };

    const getJobTags = (job) => {
        const exprienceLvlArray = job?.experienceLevelId?.map((exp) => ({
            text: exp?.name,
            bgcolor: colors.sky300,
        }));
        const jobTypeArray = job?.jobTypeId?.map((jobType) => ({
            text: jobType?.name,
            bgcolor: colors.green300,
        }));
        return [
            ...exprienceLvlArray,
            ...jobTypeArray,
            {text: job?.type, bgcolor: colors.amber200},
        ];
    };

    const getInitialJobFunctions = () => {
        if (!category) return
        const initialJobFunctions = category?.split(',');
        return jobFunctions?.data.filter((jobFunc) => {
            for (let initialJobFun of initialJobFunctions) {
                return jobFunc.id === initialJobFun
            }
        }).map((jobFunc) => ({label: jobFunc?.name, value: jobFunc?._id}))
    }

    return (
        <>
            {
                industriesLoading || jobFunctionsLoading ?
                    <div className="min-h-[800px] w-full flex justify-center items-center">
                        <NativeImage
                            imageType="loading"
                            width={40}
                            height={40}
                            color={theme.primary}
                            fillColor={theme.primary}
                        />
                    </div> : <div className="w-full min-h-screen">
                        <form onSubmit={handleSubmitSearch(handleSearchFormSubmit)}>
                            <div className="flex flex-col lg:flex-row items-center gap-2">
                                <div className="w-full grid lg:grid-cols-4 gap-4">
                                    <div>
                                        <InputText
                                            className="w-80"
                                            placeholder="Job title, Company or keyword"
                                            control={control}
                                            name="search"
                                            startPrefix={
                                                <NativeImage
                                                    imageType="briefcase"
                                                    color="#5C26D2"
                                                    fillColor="#5C26D2"
                                                    width={21}
                                                    height={21}
                                                />
                                            }
                                        />
                                    </div>
                                    <div>
                                        <ReactSelectDropDown
                                            isMulti
                                            control={control}
                                            name="cityOrTown"
                                            options={cityOrTownOptions}
                                            placeholder="City or Town"
                                            onClear={() => handleOnClear("location.city")}
                                            onRemoveItem={handleOnRemoveItem}
                                            image="mapPointer"
                                        />
                                    </div>
                                    <div>
                                        <ReactSelectDropDown
                                            isMulti
                                            control={control}
                                            name="industries"
                                            options={parseArray(industries?.data)}
                                            placeholder="Job Industries"
                                            onClear={() => handleOnClear("industryId")}
                                            onRemoveItem={handleOnRemoveItem}
                                            image="list"
                                        />
                                    </div>
                                    <div>
                                        <ReactSelectDropDown
                                            isMulti
                                            control={control}
                                            name="jobFunctions"
                                            defaultValue={getInitialJobFunctions()}
                                            options={parseArray(jobFunctions?.data)}
                                            placeholder="Job Category"
                                            onClear={() => handleOnClear("jobFunctionId")}
                                            onRemoveItem={handleOnRemoveItem}
                                            image="briefcase"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-auto">
                                    <Button type="submit" size="lg">
                                        Search
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full flex flex-wrap gap-4 mt-2">
                                <div className="w-full lg:w-[200px]">
                                    <ReactSelectDropDown
                                        control={control}
                                        name="workExp"
                                        placeholder="Work experience"
                                        options={parseArray(experiences?.data)}
                                    />
                                </div>
                                <div className="w-full lg:w-[200px]">
                                    <ReactSelectDropDown
                                        placeholder="On-Site/Remote"
                                        options={workTypeArray}
                                        name="workType"
                                        control={control}
                                    />
                                </div>
                                <div className="w-full lg:w-[250px]">
                                    <ReactSelectDropDown
                                        placeholder="Type of employment"
                                        options={parseArray(jobTypes?.data)}
                                        name="employmentType"
                                        control={control}
                                    />
                                </div>
                                <div className="w-full lg:w-[200px]">
                                    <ReactSelectDropDown
                                        placeholder="Date posted"
                                        options={datePostedArray}
                                        name="postedDate"
                                        control={control}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button size="md" variant="outlined">
                                        <NativeImage
                                            imageType="adjustHorizontal"
                                            color="#5C26D2"
                                            fillColor="#5C26D2"
                                            width={20}
                                            height={20}
                                        />
                                        Filter
                                    </Button>

                                    {showClear ? (
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            bordercolor={theme.red500}
                                            textcolor={theme.red500}
                                            onClick={clearFilterHandler}
                                        >
                                            Clear
                                        </Button>
                                    ) : (
                                        void 0
                                    )}
                                </div>
                            </div>
                        </form>

                        <div className="flex lg:gap-10 mt-6 min-h-[800px]">
                            <div className="lg:w-8/12">
                                {/*<Card fullWidth bgcolor={theme.neutral100} noBorder>*/}
                                {/*    <div className="flex justify-between items-center">*/}
                                {/*        <div className="flex items-center gap-8">*/}
                                {/*            <Image*/}
                                {/*                src="/images/envelope.svg"*/}
                                {/*                width={80}*/}
                                {/*                height={80}*/}
                                {/*                alt="envelope"*/}
                                {/*            />*/}
                                {/*            <Text*/}
                                {/*                style={{*/}
                                {/*                    fontSize: theme.fontSize.lg,*/}
                                {/*                    fontWeight: theme.fontWeight.lg,*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                Create Job Alert for this search*/}
                                {/*            </Text>*/}
                                {/*        </div>*/}

                                {/*        <Button*/}
                                {/*            size="lg"*/}
                                {/*            variant="outlined"*/}
                                {/*            bordercolor={theme.neutral400}*/}
                                {/*            textcolor={theme.neutral600}*/}
                                {/*        >*/}
                                {/*            Subscribe*/}
                                {/*        </Button>*/}
                                {/*    </div>*/}
                                {/*</Card>*/}

                                <div className="mt-5 space-y-4">
                                    <>
                                        {isFetching ? (
                                            <div className="min-h-[800px] w-full flex justify-center items-center">
                                                <NativeImage
                                                    imageType="loading"
                                                    width={40}
                                                    height={40}
                                                    color={theme.primary}
                                                    fillColor={theme.primary}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                {jobData?.data?.map((job, index) => (
                                                    <div key={index}>
                                                        <BookmarkCard
                                                            jobId={job?._id}
                                                            logoId={job?.companyId?.logoId}
                                                            title={job?.jobTitle}
                                                            subTitle={job?.company?.name}
                                                            place={job?.location?.city}
                                                            tags={getJobTags(job)}
                                                            salary={job?.salaryRange}
                                                        />
                                                    </div>
                                                ))}

                                                {jobData?.data?.length === 0 ? (
                                                    <div className="text-center mt-[100px] h-[100px]">
                                                        <Text size="lg">No Data</Text>
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </>
                                </div>

                                {!isLoading ? (
                                    <JobPagination
                                        key={jobData?.pagination?.total}
                                        totalPages={jobData?.pagination?.total}
                                        nextPage={jobData?.pagination?.next?.page}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        num={num}
                                        setNum={setNum}
                                    />
                                ) : (
                                    <div className="text-center mb-3">...</div>
                                )}

                                <div ref={bottomRef}/>
                            </div>
                            <div className="sm:w-0 lg:w-4/12 rounded-xl overflow-hidden">
                                <StyledImage/>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default JobFilterSection;

const StyledImage = styled.div`
  background-image: url("/images/rectangle.png");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const datePostedArray = [
    {value: "Last hour", label: "Last hour"},
    {value: "Last  24 hours", label: "Last  24 hours"},
    {value: "Last 7 days", label: "Last 7 days"},
    {value: "Last 14 days", label: "Last 14 days"},
    {value: "Last 30 days", label: "Last 30 days"},
];

export const cityOrTownOptions = [
    {
        label: "Amarapura",
        value: "Amarapura",
    },
    {
        label: "Bago (Pegu)",
        value: "Bago (Pegu)",
    },
    {
        label: "Bhamo",
        value: "Bhamo",
    },
    {
        label: "Bogale",
        value: "Bogale",
    },
    {
        label: "Chauk",
        value: "Chauk",
    },
    {
        label: "Chaung-U",
        value: "Chaung-U",
    },
    {
        label: "Daik-U",
        value: "Daik-U",
    },
    {
        label: "Danubyu",
        value: "Danubyu",
    },
    {
        label: "Dawei (Tavoy)",
        value: "Dawei (Tavoy)",
    },
    {
        label: "Gyobingauk",
        value: "Gyobingauk",
    },
    {
        label: "Hakha",
        value: "Hakha",
    },
    {
        label: "Hinthada",
        value: "Hinthada",
    },
    {
        label: "Hlegu",
        value: "Hlegu",
    },
    {
        label: "Hmawbi",
        value: "Hmawbi",
    },
    {
        label: "Homalin",
        value: "Homalin",
    },
    {
        label: "Hopin",
        value: "Hopin",
    },
    {
        label: "Hopong",
        value: "Hopong",
    },
    {
        label: "Hpa-an (Pha-an)",
        value: "Hpa-an (Pha-an)",
    },
    {
        label: "Hpakant",
        value: "Hpakant",
    },
    {
        label: "Hpayarthonesu",
        value: "Hpayarthonesu",
    },
    {
        label: "Hsipaw",
        value: "Hsipaw",
    },
    {
        label: "Kalaw",
        value: "Kalaw",
    },
    {
        label: "Kale (Kalemyo, Kalay)",
        value: "Kale (Kalemyo, Kalay)",
    },
    {
        label: "Kanbalu",
        value: "Kanbalu",
    },
    {
        label: "Katha",
        value: "Katha",
    },
    {
        label: "Kawkareik",
        value: "Kawkareik",
    },
    {
        label: "Kawlin",
        value: "Kawlin",
    },
    {
        label: "Kawthoung",
        value: "Kawthoung",
    },
    {
        label: "Kayan",
        value: "Kayan",
    },
    {
        label: "Kengtung",
        value: "Kengtung",
    },
    {
        label: "Kutkai",
        value: "Kutkai",
    },
    {
        label: "Kyaiklat",
        value: "Kyaiklat",
    },
    {
        label: "Kyaikto",
        value: "Kyaikto",
    },
    {
        label: "Kyaukme",
        value: "Kyaukme",
    },
    {
        label: "Kyaukpadaung",
        value: "Kyaukpadaung",
    },
    {
        label: "Kyaukpyu",
        value: "Kyaukpyu",
    },
    {
        label: "Kyaukse",
        value: "Kyaukse",
    },
    {
        label: "Kyauktaga",
        value: "Kyauktaga",
    },
    {
        label: "Kyauktan",
        value: "Kyauktan",
    },
    {
        label: "Kyonpyaw",
        value: "Kyonpyaw",
    },
    {
        label: "Labutta",
        value: "Labutta",
    },
    {
        label: "Lashio",
        value: "Lashio",
    },
    {
        label: "Laukkaing",
        value: "Laukkaing",
    },
    {
        label: "Lawksawk",
        value: "Lawksawk",
    },
    {
        label: "Letpadan",
        value: "Letpadan",
    },
    {
        label: "Loikaw",
        value: "Loikaw",
    },
    {
        label: "Madaya",
        value: "Madaya",
    },
    {
        label: "Magway (Magwe)",
        value: "Magway (Magwe)",
    },
    {
        label: "Mandalay",
        value: "Mandalay",
    },
    {
        label: "Maubin",
        value: "Maubin",
    },
    {
        label: "Mawlamyine (Moulmein)",
        value: "Mawlamyine (Moulmein)",
    },
    {
        label: "Mawlamyinegyun",
        value: "Mawlamyinegyun",
    },
    {
        label: "Meiktila",
        value: "Meiktila",
    },
    {
        label: "Minbu",
        value: "Minbu",
    },
    {
        label: "Minbya",
        value: "Minbya",
    },
    {
        label: "Mogaung",
        value: "Mogaung",
    },
    {
        label: "Mogoke (Mogok)",
        value: "Mogoke (Mogok)",
    },
    {
        label: "Mohnyin",
        value: "Mohnyin",
    },
    {
        label: "Mongla",
        value: "Mongla",
    },
    {
        label: "Monywa",
        value: "Monywa",
    },
    {
        label: "Mrauk-U",
        value: "Mrauk-U",
    },
    {
        label: "Mudon",
        value: "Mudon",
    },
    {
        label: "Muse",
        value: "Muse",
    },
    {
        label: "Myanaung",
        value: "Myanaung",
    },
    {
        label: "Myaungmya",
        value: "Myaungmya",
    },
    {
        label: "Myawaddy",
        value: "Myawaddy",
    },
    {
        label: "Myede (Aunglan, Allanmyo)",
        value: "Myede (Aunglan, Allanmyo)",
    },
    {
        label: "Myeik (Mergui)",
        value: "Myeik (Mergui)",
    },
    {
        label: "Myingyan",
        value: "Myingyan",
    },
    {
        label: "Myitkyina",
        value: "Myitkyina",
    },
    {
        label: "Nanhkan",
        value: "Nanhkan",
    },
    {
        label: "Nansang",
        value: "Nansang",
    },
    {
        label: "Naypyitaw (Pyinmana)",
        value: "Naypyitaw (Pyinmana)",
    },
    {
        label: "Nyaungdon",
        value: "Nyaungdon",
    },
    {
        label: "Nyaunglebin",
        value: "Nyaunglebin",
    },
    {
        label: "Nyaung-U",
        value: "Nyaung-U",
    },
    {
        label: "Pakokku",
        value: "Pakokku",
    },
    {
        label: "Panglong (Pinlon)",
        value: "Panglong (Pinlon)",
    },
    {
        label: "Pantanaw",
        value: "Pantanaw",
    },
    {
        label: "Pathein (Bassein)",
        value: "Pathein (Bassein)",
    },
    {
        label: "Paung",
        value: "Paung",
    },
    {
        label: "Paungde",
        value: "Paungde",
    },
    {
        label: "Phyu",
        value: "Phyu",
    },
    {
        label: "Pyapon",
        value: "Pyapon",
    },
    {
        label: "Pyawbwe",
        value: "Pyawbwe",
    },
    {
        label: "Pyay (Pyè, Prome)",
        value: "Pyay (Pyè, Prome)",
    },
    {
        label: "Pyin Oo Lwin (Maymyo)",
        value: "Pyin Oo Lwin (Maymyo)",
    },
    {
        label: "Sagaing",
        value: "Sagaing",
    },
    {
        label: "Shwebo",
        value: "Shwebo",
    },
    {
        label: "Shwegyin",
        value: "Shwegyin",
    },
    {
        label: "Sittwe (Akyab)",
        value: "Sittwe (Akyab)",
    },
    {
        label: "Tachileik",
        value: "Tachileik",
    },
    {
        label: "Taikkyi",
        value: "Taikkyi",
    },
    {
        label: "Tamu",
        value: "Tamu",
    },
    {
        label: "Tanai",
        value: "Tanai",
    },
    {
        label: "Tangyan",
        value: "Tangyan",
    },
    {
        label: "Tatkon",
        value: "Tatkon",
    },
    {
        label: "Taungdwingyi",
        value: "Taungdwingyi",
    },
    {
        label: "Taunggyi",
        value: "Taunggyi",
    },
    {
        label: "Taungoo (Toungoo)",
        value: "Taungoo (Toungoo)",
    },
    {
        label: "Thanbyuzayat",
        value: "Thanbyuzayat",
    },
    {
        label: "Thanlyin",
        value: "Thanlyin",
    },
    {
        label: "Thaton",
        value: "Thaton",
    },
    {
        label: "Thayarwady (Tharrawaddy)",
        value: "Thayarwady (Tharrawaddy)",
    },
    {
        label: "Thayet",
        value: "Thayet",
    },
    {
        label: "Thazi",
        value: "Thazi",
    },
    {
        label: "Thongwa",
        value: "Thongwa",
    },
    {
        label: "Toungup",
        value: "Toungup",
    },
    {
        label: "Twantay",
        value: "Twantay",
    },
    {
        label: "Waingmaw",
        value: "Waingmaw",
    },
    {
        label: "Wakema",
        value: "Wakema",
    },
    {
        label: "Waw",
        value: "Waw",
    },
    {
        label: "Wundwin",
        value: "Wundwin",
    },
    {
        label: "Yamethin",
        value: "Yamethin",
    },
    {
        label: "Yangon [Rangoon]",
        value: "Yangon [Rangoon]",
    },
    {
        label: "Ye",
        value: "Ye",
    },
    {
        label: "Yedashe",
        value: "Yedashe",
    },
    {
        label: "Yenangyaung",
        value: "Yenangyaung",
    },
    {
        label: "Yesagyo",
        value: "Yesagyo",
    },
    {
        label: "Ye-U",
        value: "Ye-U",
    },
    {
        label: "Zalun",
        value: "Zalun",
    },
];

const workTypeArray = [
    {value: "all", label: "All"},
    {value: "on-site", label: "On-site"},
    {value: "temp-remote", label: "Temporarily remote"},
    {value: "hybrid", label: "Hybrid"},
    {value: "fully-remote", label: "Fully remote"},
];
