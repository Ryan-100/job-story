import styled, {useTheme} from "styled-components";
import {Image, Text} from "@/components/LV1";
import {Button} from "@/components/LV2/Button";
import Section from "./section-container/Section";
import {useRouter} from "next/router";
import queryString from "query-string";

const CategorySection = ({jobFunctionData}) => {
    const theme = useTheme();
    const router = useRouter();
    const handleCategorySelect = (categoryId) => {
        const paramsData = {
            category: categoryId,
        }
        router.push(`/jobs?${queryString.stringify(paramsData)}`);
    };

    return (
        <Section
            title="Browse Job Categories"
            subTitle="Find jobs that match your skills and experience."
        >
            <div
                className="w-[300px] xs:w-[480px] sm:w-[640px] md:w-[790px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5 md:gap-y-8 gap-x-4 items-start pt-5">
                {categories.map((el, index) => {
                    const job = jobFunctionData?.filter((job) => job?.name === el.name);
                    return (
                        <div
                            key={el?.name}
                            className="flex flex-col items-center justify-center gap-2 p-2 hover:cursor-pointer hover:shadow"
                            onClick={() => handleCategorySelect(job[0]?._id)}
                        >
                            <IconWrapper key={index}>
                                <Image
                                    // imageType={iconName}
                                    imageType="movie"
                                    width={24}
                                    height={24}
                                    color={theme.primary}
                                    fillColor={theme.primary}
                                />
                            </IconWrapper>

                            <div className="text-center">
                                <Text size="sm" weight="semilg">
                                    {el?.name}
                                </Text>
                                <Text size="xs" color="neutral500">
                                    {job?.length ? job?.[0]?.jobs : "0"} jobs
                                </Text>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-60 pt-6">
                <Button fullWidth size="lg" href="/category">
                    <span>Browse all categories</span>
                    <Image imageType="greaterThan" width={18} height={18}/>
                </Button>
            </div>
        </Section>
    );
};

export default CategorySection;

const IconWrapper = styled.div`
  width: 56px;
  padding: 16px;
  background-color: ${({theme}) => theme.neutral200};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const categories = [
    {name: "Administrative", icon: ""},
    {name: "Marketing/Sales", icon: ""},
    {name: "Customer Service, Support", icon: ""},
    {name: "Finance/Accounting", icon: ""},
    {name: "Human Resources", icon: ""},
    {name: "Information Technology", icon: ""},
    {name: "Marketing/Advertising", icon: ""},
    {name: "Operations/Engineering", icon: ""},
];
