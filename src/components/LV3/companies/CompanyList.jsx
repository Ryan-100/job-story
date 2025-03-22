import React, {useEffect, useState} from 'react';
import WorkPlaceCard from "@/components/LV3/common/cards/WorkPlaceCard";
import {Image as NativeImage} from "@/components/LV1";
import {InputText} from "@/components/LV2/Inputs";
import {useForm} from "react-hook-form";
import {Button} from "@/components/LV2/Button";
import {useTheme} from "styled-components";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import ReactPaginate from "react-paginate";
import {useFetchIndustriesQuery} from "@/store/modules/jobs/jobsModules";
import {cityOrTownOptions, parseArray} from "@/components/LV3/Jobs/JobFilterSection";
import {getToken} from "@/service";
import {useFetchCompaniesQuery} from "@/store/modules/company/companyModules";

function CompanyList(props) {
    const [currentPage, setCurrentPage] = useState(1);  // current active page
    const [pageCount, setPageCount] = useState(0);  // page count for pagination
    const itemsPerPage = 6;    // items per page count

    const theme = useTheme();
    const [token, setToken] = useState(null);
    const [showClearFilter, setShowClearFilter] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [searchParams, setSearchParams] = useState(() => ({
        limit: 6,
    }));

    const {data: companiesData, isFetching: companiesDataFetching} = useFetchCompaniesQuery({
        query: {
            ...searchParams,
        },
        token
    });

    console.log(searchParams)

    const {data: industries, isLoading: industriesLoading} = useFetchIndustriesQuery();
    const {control, handleSubmit, watch, reset} = useForm();
    const watchIndustries = watch('industries');
    const watchLocations = watch('cityOrTown');

    useEffect(() => {
        if (
            watchIndustries?.length > 0 ||
            watchLocations?.length > 0
        ) {
            setShowClearFilter(true);
        }
    }, [watchIndustries, watchLocations])

    useEffect(() => {
        if (!companiesData) return;
        const totalPageCount = companiesData?.total;
        setPageCount(Math.ceil(totalPageCount / itemsPerPage))
    }, [companiesData])

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token);
        }
    }, []);

    // reset filter fields
    const clearFilterHandler = () => {
        reset({
            industries: [],
            cityOrTown: [],
        });
        setSearchParams(prev => {
            delete prev.industryId;
            delete prev["location.city"]
            return prev
        })
        setShowClearFilter(false);
    };

    // toggle show/hide for filtering fields
    const showFiltersHandler = () => {
        setShowFilters(prev => !prev)
    }

    // navigate pagination with page numbers
    const handlePageClick = ({selected}) => {
        setCurrentPage(selected + 1)
        setSearchParams(prev => ({...prev, page: selected + 1}))

        // router.push({
        //     pathname: router.pathname,
        //     query: { page: selected + 1 },
        // });
        // fetchData(selected);
    };

    // on search
    const handleOnSubmit = (data) => {
        const industriesArray = data.industries?.map((industry) => industry.value);
        const cityArray = data.cityOrTown?.map((city) => city.value);
        setCurrentPage(1)
        setSearchParams((prevParams) => ({
            ...prevParams,
            ...(industriesArray?.length > 0 && {
                industryId: JSON.parse(JSON.stringify(industriesArray)).join(","),
            }),
            ...(cityArray?.length > 0 && {
                ["location.city"]: JSON.parse(JSON.stringify(cityArray)).join(","),
            }),
            ...(!!data.search && {search: data.search}),
        }));
    }

    // clear all items inside multiple dropdowns
    const handleOnClear = (field) => {
        const searchParamsCopy = {...searchParams};
        for (const key in searchParamsCopy) {
            if (key === field) {
                delete searchParamsCopy[key];
            }
        }
        setSearchParams(searchParamsCopy);
        setShowClearFilter(false)
    };

    // multiple dropdowns item remove handler
    const handleOnRemoveItem = (removedItem, field) => {
        const searchParamsCopy = {...searchParams};
        let keyToUpdate;

        if (field === "cityOrTown") {
            keyToUpdate = "location.city";
        } else if (field === "industries") {
            keyToUpdate = "industryId";
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

    const disabledButton = "bg-slate-300 hover:bg-slate-300 cursor-not-allowed";
    const paginationButton = "bg-slate-500 hover:bg-slate-600";

    return (
        <div className="pt-6 container mx-auto">
            <div className="my-5">
                <p className="text-center text-xl font-bold">Companies</p>
            </div>

            <div className="px-5 md:px-[80px] lg:px-[150px]">
                <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-3 mb-5'>
                    <div className="w-full grid lg:grid-cols-5 gap-4">
                        <div className="w-full col-span-4">
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
                        </div>
                        <div className="w-full lg:w-auto flex items-center justify-between gap-2">
                            <Button fullWidth size="lg" type="submit">
                                Search
                            </Button>
                            <Button
                                variant="outlined"
                                bordercolor={theme.neutral100}
                                size="lg"
                                onClick={showFiltersHandler}
                                type={"button"}
                            >
                                <NativeImage
                                    imageType="list"
                                    color="#5C26D2"
                                    fillColor="#5C26D2"
                                    width={21}
                                    height={21}
                                />
                            </Button>
                        </div>

                    </div>

                    {showFilters
                        ? <div className="grid md:grid-cols-7 gap-2 pb-3 ">
                            <div className="md:col-start-2 col-span-2">
                                <ReactSelectDropDown
                                    isMulti
                                    control={control}
                                    name="cityOrTown"
                                    options={cityOrTownOptions}
                                    placeholder="Location"
                                    onClear={() => handleOnClear("location.city")}
                                    onRemoveItem={handleOnRemoveItem}
                                    image="mapPointer"
                                />
                            </div>
                            <div className="col-span-2">
                                <ReactSelectDropDown
                                    isMulti
                                    control={control}
                                    name="industries"
                                    options={parseArray(industries?.data)}
                                    placeholder="Industry"
                                    onClear={() => handleOnClear("industryId")}
                                    onRemoveItem={handleOnRemoveItem}
                                    image="list"
                                />
                            </div>
                            <div className="col-span-1">
                                <Button fullWidth variant="outlined" type="submit">
                                    Filter
                                </Button>
                            </div>
                            {showClearFilter
                                ? <div className="col-span-1">
                                    <Button
                                        variant="outlined" type="button"
                                        bordercolor={theme.red500}
                                        textcolor={theme.red500}
                                        onClick={clearFilterHandler}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                                : null}

                        </div> : null}
                </form>

                {companiesDataFetching
                    ? <div className="min-h-[400px] w-full flex justify-center items-center">
                        <NativeImage
                            imageType="loading"
                            width={40}
                            height={40}
                            color={theme.primary}
                            fillColor={theme.primary}
                        />
                    </div>
                    : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companiesData?.data?.map((company, index) => (
                                <WorkPlaceCard
                                    fullWidth
                                    key={company.id}
                                    logoImg={company.logoId}
                                    title={company.name}
                                    socialLinks={company.socialLinks}
                                    icons={["location", "folder", "filter", "bookmark"]}
                                    route="/jobs"
                                />
                            )
                        )}
                    </div>
                }
                <ReactPaginate
                    // forcePage={currentPage}
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
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                />
            </div>
        </div>
    )
        ;
}

export default CompanyList;