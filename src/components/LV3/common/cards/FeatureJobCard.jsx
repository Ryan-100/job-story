import Image from "next/image";
import {useRouter} from "next/router";
import {useTheme} from "styled-components";

import {Image as Icon, Text, Title} from "@/components/LV1";
import {Button} from "@/components/LV2/Button";
import {Card} from "@/components/LV2/Card";
import {Tag} from "@/components/LV2/Tag";
import {useFetchFileByIdQuery} from "@/store/modules/file/fileModule";

/**
 * @param logoImg
 * @param title
 * @param subTitle
 * @param place
 * @param level
 * @param time
 * @param route
 */

const FeatureJobCard = (props) => {
    const theme = useTheme();
    const router = useRouter();

    const {data: companyLogoData} = useFetchFileByIdQuery({id: props.logoImg});
    const imgUrl = companyLogoData?.data?.url || '/images/logo.svg';

    return (
        <Card as="article" width={260} className="space-y-6">
            <div className="w-24">
                <Image src={imgUrl} width={100} height={40} alt="alt text"/>
            </div>

            <div className="space-y-1">
                <Title size="md" weight="xl" as="h2" mb="0" className="truncate">
                    {props.title}
                </Title>
                <Text as="p" size="xs" color="neutral600">
                    {props.subTitle}
                </Text>

                <div className="flex items-center justfy-between py-3 pb-4 gap-6">
                    <div className="flex items-center gap-1">
                        <Icon
                            imageType="location"
                            width={20}
                            height={20}
                            color={theme.neutral400}
                        />
                        <Text as="p" size="xs" color="neutral600" className="mb-0">
                            {props.place}
                        </Text>
                    </div>

                    <div className="flex items-center gap-1">
                        <Icon
                            imageType="folder"
                            width={20}
                            height={20}
                            color={theme.neutral400}
                        />
                        <Text as="p" size="xs" color="neutral600" className="mb-0">
                            Negotiable
                        </Text>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {props.tags.map((el, index) => (
                        <Tag key={index} as="p" bgcolor={el.bgcolor}>
                            {el.text}
                        </Tag>
                    ))}
                </div>
            </div>

            <div className="flex items-center">
                <Button fullWidth onClick={() => router.push(props.route)}>
                    View Details
                </Button>
                {/* <Icon
          className="cursor-pointer"
          imageType="bookmark"
          width={26}
          height={26}
          color={theme.neutral700}
        /> */}
            </div>
        </Card>
    );
};

export default FeatureJobCard;
