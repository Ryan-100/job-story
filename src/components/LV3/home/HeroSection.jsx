import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import styled, {useTheme} from "styled-components";

import {Image as NativeImage, Text, Title} from "@/components/LV1";
import {Button} from "@/components/LV2/Button";
import {InputText} from "@/components/LV2/Inputs";
import {useRouter} from "next/router";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import queryString from "query-string";

const HeroSection = ({jobFunctionData}) => {
    const [jobFunction, setJobFunction] = useState([]);

    const router = useRouter();
    const theme = useTheme();

    const {control, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const jobFunctionsArray = data.category.map((jobFunc) => jobFunc.value);
        const cityArray = data.place.map((city) => city.value);
        let paramsData = {
            ...(!!data.search && {search: data.search}),
            ...(jobFunctionsArray.length > 0 && {
                category: JSON.parse(JSON.stringify(jobFunctionsArray)).join(","),
            }),
            ...(cityArray.length > 0 && {
                location: JSON.parse(JSON.stringify(cityArray)).join(","),
            }),
        };

        router.push(`/jobs?${queryString.stringify(paramsData)}`);
    };

    useMemo(() => {
        if (jobFunctionData) {
            setJobFunction(() => [
                ...jobFunctionData?.map((el) => ({
                    value: el._id,
                    label: el.name,
                })),
            ]);
        }
    }, [jobFunctionData]);

    return (
        <>
            <section className="w-full h-auto lg:h-[420px] grid grid-cols-12 relative">
                <div className="w-full h-full absolute top-0 left-0">
                    <ImageWrapContainer></ImageWrapContainer>
                </div>
                {/* Hero section */}
                <div className="col-start-2 col-end-12 text-white space-y-8 py-20 z-50">
                    <div className="w-96">
                        <Text size="lg" weight="semilg">
                            We have 150,000 + live jobs
                        </Text>

                        <Title as="h1" size="xxl" weight="xxl">
                            Find your dream jobs with{" "}
                            <span
                                className="rounded-full py-0.5 px-4"
                                style={{backgroundColor: theme.primary}}
                            >
                Juncture
              </span>
                        </Title>
                    </div>

                    <div>
                        <Text>Find jobs, create trackable resumes and enrich your</Text>
                        <Text>
                            applications. Carefully crafted after analyzing the needs of
                            different industries.
                        </Text>
                    </div>

                    <form
                        className="flex items-center mt-12"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full flex flex-col lg:flex-row  items-center justify-center gap-4">
                            <div className="w-full grid lg:grid-cols-3 gap-4">
                                <InputText
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
                                <div className='text-black'>
                                    <ReactSelectDropDown
                                        isMulti
                                        control={control}
                                        name="place"
                                        options={placeOptions}
                                        placeholder="City or Town"
                                        image="mapPointer"
                                    />
                                </div>
                                <div className='text-black'>
                                    <ReactSelectDropDown
                                        isMulti
                                        control={control}
                                        name="category"
                                        options={jobFunction}
                                        placeholder="Job Category"
                                        image="list"
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-auto ">
                                <Button type="submit" size="lg" fullWidth>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/*comment out refer section*/}
            {/*<section className="w-full grid grid-cols-12">*/}
            {/*    /!* Refer section *!/*/}
            {/*    <div className="col-start-2 col-end-12 w-full flex flex-col md:flex-row items-center gap-14 ">*/}
            {/*        <div className="w-2/5 flex justify-end">*/}
            {/*            <Image*/}
            {/*                src="/images/refer-img.svg"*/}
            {/*                width={380}*/}
            {/*                height={320}*/}
            {/*                alt="refer-img"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className="w-auto md:w-[600px] flex flex-col items-start space-y-6 justify-start">*/}
            {/*            <Title size="xxl" weight="xl" mb="5">*/}
            {/*                Refer your friends, earn 20% of what they make*/}
            {/*            </Title>*/}

            {/*            <Text size="md" color="neutral600">*/}
            {/*                Earn 20% of your friend’s first month salary . Upgrade to a*/}
            {/*                freelancer account and you can refer unlimited friends per job*/}
            {/*                opening, earning a 20% commission on their first three month's*/}
            {/*                salary.*/}
            {/*            </Text>*/}

            {/*            <div className="w-full flex item-center justify-center">*/}
            {/*                <Button size="lg">Upgrade Now &gt;</Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    );
};

export default HeroSection;

const placeOptions = [
    {value: "Mandalay", label: "Mandalay"},
    {value: "Yangon", label: "Yangon"},
    {value: "Singapore", label: "Singapore"},
    {value: "Thailand", label: "Thailand"},
    {value: "Germany", label: "Germany"},
    {value: "UK", label: "UK"},
];

const categoryOptions = [
    {id: 1, name: "Industry"},
    {id: 2, name: "Education"},
];

const ImageWrapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("/images/hero_bg.jpeg");
  background-position: center;
  background-size: cover;
  object-fit: cover;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7); /* 50% opacity */
    z-index: 10;
  }
`;
