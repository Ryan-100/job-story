import {useTheme} from "styled-components";
import Link from "next/link";
import {colors, Image as NativeImage, Image as ImageIcon, Text, Title} from "@/components/LV1";
import {Button} from "@/components/LV2/Button";
import {Card} from "@/components/LV2/Card";
import {Tag} from "@/components/LV2/Tag";
import {useFetchCompanyByIdQuery} from "@/store/modules/company/companyModules";
import {useRouter} from "next/router";
import {useFetchFileByIdQuery} from "@/store/modules/file/fileModule";
import React, {useEffect, useState} from "react";
import PriorRequest from "./PriorRequest";
import Image from "next/image";
import {getToken} from "@/service";
import {useFetchJobsQuery} from "@/store/modules/jobs/jobsModules";
import ReactPaginate from "react-paginate";


const CompanyDetail = () => {
    const [currentPage, setCurrentPage] = useState(1);  // current active page
    const [pageCount, setPageCount] = useState(0);  // page count for pagination
    const itemsPerPage = 6;    // items

    const [token, setToken] = useState(null);
    const [openPriorModal, setOpenPriorModal] = useState(false);
    const [searchParams, setSearchParams] = useState(() => ({
        limit: itemsPerPage,
    }));
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token);
        }
    }, []);

    const {data: jobsByCompany, isFetching: companiesDataFetching} = useFetchJobsQuery({
        query: {
            ...searchParams,
            companyId: '63a6f2efa5840119f2657083',
            populate: "experienceLevelId,jobTypeId"
        },
        token,
        page: 1
    });

    const {data: companyData} = useFetchCompanyByIdQuery({
        id: router.query.companyId,
        params: {},
    });

    const {data: logoData} = useFetchFileByIdQuery({
        id: companyData?.data?.logoId,
    });

    const {data: bannerData} = useFetchFileByIdQuery({
        id: companyData?.data?.bannerId,
    });

    useEffect(() => {
        if (!jobsByCompany) return;
        setPageCount(jobsByCompany?.pagination?.total)
    }, [jobsByCompany])

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected + 1)
        setSearchParams(prev => ({...prev, page: selected + 1}))
    };

    const disabledButton = "bg-slate-300 hover:bg-slate-300 cursor-not-allowed";
    const paginationButton = "bg-slate-500 hover:bg-slate-600";

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


    return (
        <>
            <main className="grid grid-cols-12 space-y-4 pt-2.5">
                <section className="col-start-2 col-end-12 h-[613px] flex flex-col bg-[#F4FDF4]">
                    <div className="w-full h-1/2  relative bg-sky-200">
                        {bannerData?.data?.url
                            ? <Image
                                src={bannerData?.data?.url}
                                alt="company background image"
                                fill
                                className="object-cover"
                            />
                            : null}
                    </div>

                    <div className="h-1/2 relative">
                        <div
                            className="absolute left-6 -top-14 z-10 rounded-full overflow-hidden border-4 border-white">
                            <ImageIcon
                                imageType="image"
                                src={logoData?.data?.url}
                                alt="company logo"
                                width={120}
                                height={120}
                            />
                        </div>

                        <div className=" space-y-4 p-6 mt-20">
                            <Title size="xxl" weight="xxl" mb="0">
                                {companyData?.data?.name}
                            </Title>

                            <div className="flex items-center gap-2">
                                <ImageIcon
                                    imageType="location"
                                    width={20}
                                    height={20}
                                    color={theme.neutral400}
                                    fillColor={theme.neutral400}
                                />
                                <Text size="md" color="neutral600">
                                    {companyData?.data?.address}
                                </Text>
                            </div>

                            <div className="flex items-center gap-2">
                                <ImageIcon
                                    imageType="image"
                                    src="/images/people.svg"
                                    alt="one people icon"
                                    width={20}
                                    height={20}
                                />
                                <Text size="md" color="neutral600">
                                    {companyData?.data?.size?.min} - {companyData?.data?.size?.max} Employees
                                </Text>
                            </div>

                            <Link href="#" target="_blank" className="inline-block">
                                <div className="flex items-center gap-2">
                                    <ImageIcon
                                        imageType="image"
                                        src="/images/page.svg"
                                        alt="web pages icon"
                                        width={20}
                                        height={20}
                                    />
                                    <div className="flex gap-2">
                                        {companyData?.data?.websiteLinks?.map((el, index) => (
                                            <Text
                                                key={index}
                                                size="md"
                                                color="neutral600"
                                                className="underline"
                                            >
                                                {el}
                                            </Text>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Feature */}
                <Card
                    fullWidth
                    noBorder
                    bgcolor="#F4FDF4"
                    as="section"
                    className="col-start-2 col-end-12 p-6"
                >
                    <Title weight="xxl">About Us</Title>
                    <Text color="neutral500">{companyData?.data?.description}</Text>
                </Card>

                {/* What we offer */}
                <section className="col-start-2 col-end-12 grid grid-flow-col auto-cols-fr gap-x-4">
                    <Card fullWidth noBorder bgcolor="#F4FDF4">
                        <div className="flex flex-col gap-4">
                            <ImageIcon
                                imageType="image"
                                src="/images/offer.svg"
                                width={40}
                                height={40}
                            />

                            <Title weight="xxl" mb="0">
                                What we offer
                            </Title>

                            <Text color="neutral500">{companyData?.data?.offering}</Text>
                        </div>
                    </Card>
                    <Card fullWidth noBorder bgcolor="#F4FDF4">
                        <div className="flex flex-col gap-4">
                            <ImageIcon
                                imageType="image"
                                src="/images/vision.svg"
                                width={40}
                                height={40}
                            />

                            <Title weight="xxl" mb="0">
                                Our vision
                            </Title>

                            <Text color="neutral500">{companyData?.data?.vision}</Text>
                        </div>
                    </Card>
                    <Card fullWidth noBorder bgcolor="#F4FDF4">
                        <div className="flex flex-col gap-4">
                            <ImageIcon
                                imageType="image"
                                src="/images/culture.svg"
                                width={40}
                                height={40}
                            />

                            <Title weight="xxl" mb="0">
                                Our culture
                            </Title>

                            <Text color="neutral500">{companyData?.data?.culture}</Text>
                        </div>
                    </Card>
                </section>

                {/* Current Openings Jobs */}
                <Card fullWidth as="section" className="col-start-2 col-end-12">
                    <Title weight="xxl">Current Openings</Title>

                    <div>
                        {companiesDataFetching ?
                            <div className="min-h-[400px] w-full flex justify-center items-center">
                                <NativeImage
                                    imageType="loading"
                                    width={40}
                                    height={40}
                                    color={theme.primary}
                                    fillColor={theme.primary}
                                />
                            </div> : <div className="w-full grid grid-cols-2 gap-4">
                                {jobsByCompany?.data?.map((job) => <div
                                    className="w-full space-y-1 border rounded-lg drop-shadow-lg p-4 hover:cursor-pointer hover:shadow-md"
                                    onClick={() => router.push('/jobs/' + job?.id)}
                                >
                                    <Title
                                        className="cursor-pointer"
                                        size="md"
                                        weight="xl"
                                        as="h2"
                                        mb="0"
                                    >
                                        {job?.jobTitle}
                                    </Title>
                                    <Text as="p" size="xs" color="neutral600">
                                        some
                                    </Text>

                                    <div className="flex items-center py-2.5 gap-6">
                                        <div className="flex gap-1">
                                            <ImageIcon
                                                imageType="location"
                                                width={20}
                                                height={20}
                                                color={theme.neutral400}
                                            />
                                            <Text as="p" size="xs" color="neutral600">
                                                place
                                            </Text>
                                        </div>

                                        <div className="flex gap-1">
                                            <ImageIcon
                                                imageType="folder"
                                                width={20}
                                                height={20}
                                                color={theme.neutral400}
                                            />
                                            {
                                                (!job?.salaryRange?.min && !job?.salaryRange?.max)
                                                    ?
                                                    <Text as="p" size="xs" color="neutral600">
                                                        Negotiable
                                                    </Text>
                                                    : <Text as="p" size="xs" color="neutral600">
                                                        {!job?.salaryRange?.min || '-'} - {!job?.salaryRange?.max || '-'}
                                                    </Text>
                                            }

                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        {getJobTags(job)?.map((el, index) => (
                                            <Tag
                                                key={index}
                                                as="p"
                                                bgcolor={el.bgcolor || theme.green400}
                                            >
                                                {el?.text}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>)}
                            </div>}
                        <div className="mx-auto container">
                            <ReactPaginate
                                forcePage={currentPage - 1}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                                pageClassName={"page-item"}
                                previousLabel={
                                    <Button
                                        disabled={currentPage === 0}
                                        className={`${
                                            currentPage === 0 ? disabledButton : paginationButton
                                        }`}
                                        variant="outlined"
                                        bordercolor={theme.neutral300}
                                        onClick={() => console.log('previous')}
                                    >
                                        <NativeImage
                                            imageType="greaterThan"
                                            width={14}
                                            height={22}
                                            className="rotate-180"
                                        />
                                    </Button>
                                }
                                nextLabel={
                                    <Button
                                        disabled={currentPage === pageCount - 1}
                                        className={`${
                                            currentPage === pageCount - 1
                                                ? disabledButton
                                                : paginationButton
                                        }`}
                                        variant="outlined"
                                        bordercolor={theme.neutral300}
                                        onClick={() => console.log('next')}
                                    >
                                        <NativeImage
                                            imageType="greaterThan"
                                            width={14}
                                            height={22}
                                        />
                                    </Button>
                                }
                            />
                        </div>

                    </div>
                </Card>

                {/* // Prior Request */}
                <section className="col-start-2 col-end-12">
                    <div className="w-full h-[228px] bg-company-cta-prior-bg bg-no-repeat bg-cover">
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                            <Title mb="0" size="xl" weight="xxl" color="white">
                                Prior Request
                            </Title>
                            <Text color="white" className="w-[480px]">
                                Submit a request for employment if no current openings match your skills and experience.
                                Your application will be considered for future openings.
                            </Text>

                            <div className="w-60">
                                <Button
                                    onClick={() => setOpenPriorModal(true)}
                                    startIcon={
                                        <ImageIcon imageType="location" width={20} height={20}/>
                                    }
                                    fullWidth
                                >
                                    Submit Resume
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="col-start-2 col-end-12">testimonials</section> */}

                <section className="col-span-full bg-[#00B14F]">
                    <div className="h-[120px] flex flex-col items-center justify-center">
                        <Title weight="xxl" color="white">
                            Connect with us on
                        </Title>

                        <div className="flex items-center gap-6">
                            {companyData?.data?.socialLinks.map((el, index) => (
                                <Link
                                    href={el.link}
                                    target="_blank"
                                    key={index}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer"
                                >
                                    <ImageIcon
                                        imageType={el.type.toLowerCase()}
                                        width={20}
                                        height={20}
                                        color={theme.green600}
                                        fillColor={theme.green600}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <PriorRequest
                isOpen={openPriorModal}
                onClose={() => setOpenPriorModal(false)}
            />
        </>
    );
};

export default CompanyDetail;
