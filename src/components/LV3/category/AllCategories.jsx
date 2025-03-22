import {Text, Title} from "@/components/LV1";
import {Card} from "@/components/LV2/Card";
import {useFetchJobFunctionQuery} from "@/store/modules/jobs/jobsModules";
import {useTheme} from "styled-components";
import {useRouter} from "next/router";
import queryString from "query-string";

const AllCategories = () => {
    const theme = useTheme();
    const router = useRouter();
    const {data: jobFunctionData} = useFetchJobFunctionQuery({
        populate: "jobs",
    });

    const handleCategorySelect = (categoryId) => {
        const paramsData = {
            category: categoryId,
        }
        router.push(`/jobs?${queryString.stringify(paramsData)}`);
    };

    return (
        <section className="py-10 px-8 lg:px-[156px] w-full">
            <div className="text-center">
                <Title as="h2" size="lg" weight="lg" color="neutral600">
                    Browse Job By Categories
                </Title>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-5">
                {[
                    {start: 0, end: 13},
                    {start: 13, end: 26},
                    {start: 26, end: 39},
                ].map((box, index) => (
                    <div className="w-full" key={index}>
                        <Card fullWidth bgcolor={theme.neutral100}>
                            <div className="space-y-3 py-2">
                                {jobFunctionData?.data
                                    ?.slice(box.start, box.end)
                                    ?.map((el, index) => {
                                        return <div
                                            className="bg-white border py-1.5 px-4 rounded-sm flex items-center
                                            justify-between hover:cursor-pointer hover:shadow-md"
                                            key={index}
                                            onClick={() => handleCategorySelect(el?.id)}
                                        >
                                            <Text as="p">{el?.name}</Text>
                                            <Text
                                                size="xs"
                                                as="span"
                                                className="py-1 px-2 rounded-md bg-gray-200"
                                            >
                                                {el?.jobs}
                                            </Text>
                                        </div>
                                    })}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllCategories;
