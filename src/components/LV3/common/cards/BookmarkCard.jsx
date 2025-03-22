import Image from "next/image";
import {useTheme} from "styled-components";

import {Image as Icon, Text, Title} from "@/components/LV1";
import {Card} from "@/components/LV2/Card";
import {Tag} from "@/components/LV2/Tag";
import {useRouter} from "next/router";
import {useFetchFileByIdQuery} from "@/store/modules/file/fileModule";
import React from "react";

const BookmarkCard = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const {data: companyLogoData} = useFetchFileByIdQuery({id: props.logoId});
    const imgUrl = companyLogoData?.data?.url;
    return (
        <Card
            fullWidth
            as="article"
            noBorder
            onClick={() => router.push(`/jobs/${props.jobId}`)}
            className="hover:cursor-pointer hover:scale-[1.01] hover:shadow-lg transition-all"
        >
            <div className="w-full flex items-center gap-10">
                <div className="rounded-md overflow-hidden">
                    {imgUrl ? (
                        <Image src={imgUrl} width={120} height={120} alt="logo"/>
                    ) : (
                        <div className="w-[120px] h-[120px] rounded bg-slate-300"/>
                    )}
                </div>

                <div className="w-4/6 space-y-1">
                    <Title
                        className="cursor-pointer"
                        size="md"
                        weight="xl"
                        as="h2"
                        mb="0"
                    >
                        {props.title}
                    </Title>
                    <Text as="p" size="xs" color="neutral600">
                        {props.subTitle}
                    </Text>

                    <div className="flex items-center justfy-between py-2.5 gap-6">
                        <div className="flex gap-1">
                            <Icon
                                imageType="location"
                                width={20}
                                height={20}
                                color={theme.neutral400}
                            />
                            <Text as="p" size="xs" color="neutral600">
                                {props.place}
                            </Text>
                        </div>

                        <div className="flex gap-1">
                            <Icon
                                imageType="folder"
                                width={20}
                                height={20}
                                color={theme.neutral400}
                            />
                            <Text as="p" size="xs" color="neutral600">
                                {
                                    (!props?.salaryRange?.min && !props?.salaryRange?.max)
                                        ?
                                        <Text as="p" size="xs" color="neutral600">
                                            Negotiable
                                        </Text>
                                        : <Text as="p" size="xs" color="neutral600">
                                            {!props?.salaryRange?.min || '-'} - {!props?.salaryRange?.max || '-'}
                                        </Text>
                                }
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {props.tags?.map((el, index) => (
                            <Tag key={index} as="p" bgcolor={el.bgcolor}>
                                {el.text}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BookmarkCard;
