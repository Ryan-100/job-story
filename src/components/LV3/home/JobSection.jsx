import {colors} from "@/components/LV1";
import {Swiper} from "@/components/LV2/Swiper";
import {useFetchJobsQuery} from "@/store/modules/jobs/jobsModules";
import {SwiperSlide} from "swiper/react";
import FeatureJobCard from "../common/cards/FeatureJobCard";
import Section from "./section-container/Section";
import {useEffect, useState} from "react";
import {getToken} from "@/service";

const JobSection = () => {
    const [token, setToken] = useState(null)
    const {data: jobData} = useFetchJobsQuery({
        query: {
            populate: "experienceLevelId,jobTypeId",
            limit: 8,
            page: 1,
        }, token: token
    });

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token)
        }
    }, [])

    console.log(jobData)

    return (
        <Section
            title="Featured Jobs"
            subTitle="Find the perfect job for you here with Juncture"
        >
            <div className="w-auto sm:w-[640px] md:w-[900px] lg:w-auto">
                <Swiper>
                    {jobData?.data?.map((job, index) => (
                        <SwiperSlide key={index}>
                            <FeatureJobCard
                                key={index}
                                logoImg={job?.companyId?.id}
                                title={job.jobTitle || "Third Party Information"}
                                subTitle={job.company.name || "CITIBANK"}
                                place={job.location.city || "Yangon"}
                                level="Entry Level"
                                time="Full Time"
                                route={`/jobs/${job._id}`}
                                tags={featureJobCardTags}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
};

export default JobSection;

const featureJobCardTags = [
    {text: "Entry Level", bgcolor: colors.sky300},
    {text: "Full Time", bgcolor: colors.amber200},
];
