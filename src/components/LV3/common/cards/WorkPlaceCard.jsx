import Image from "next/image";
import {useRouter} from "next/router";
import {useTheme} from "styled-components";

import {Image as Icon, Text, Title} from "@/components/LV1";
import {Card} from "@/components/LV2/Card";
import {Button} from "@/components/LV2/Button";
import {useFetchFileByIdQuery} from "@/store/modules/file/fileModule";
import Link from "next/link";

/**
 * @param logoImg
 * @param title
 * @param icons array ['place','location',...]
 * @param route
 */

const WorkPlaceCard = (props) => {
    const theme = useTheme();
    const router = useRouter();

    const widthConfig = {
        ...(props.fullWidth ? {fullWidth: true} : {width: 300})
    }

    const {data: companyLogoData} = useFetchFileByIdQuery({id: props.logoImg});
    const imgUrl = companyLogoData?.data?.url || '/images/logo.svg';

    const getLinksIcons = () => {
        return props.socialLinks?.map((link) => {
            if (link.type === 'Facebook') {
                return ['facebook', link.link]
            } else if (link.type === 'Twitter') {
                return ['twitter', link.link]
            } else if (link.type === 'Linkedin') {
                return ['linkedIn', link.link]
            } else if (link.type === 'Youtube') {
                return ['youtube', link.link]
            } else if (link.type === 'Instagram') {
                return ['instagram', link.link]
            }
        })
    }

    console.log(getLinksIcons())

    return (
        <Card as="article" {...widthConfig}>
            <div className="space-y-4 p-1">
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                    <Image src={imgUrl} width={40} height={40} alt="alt"/>
                    <Title>{props.title}</Title>
                </div>

                <Text size="sm" color="neutral500">
                    {props.description ? props.description : <p className="text-center">...</p>}
                </Text>

                <div className="flex items-center justify-between px-4 py-2 h-[50px]">
                    {getLinksIcons()?.length > 0 &&
                    getLinksIcons()?.map(([icon, link], index) => {
                        return <Link legacyBehavior href={'https://' + link} passHref>
                            <a target="_blank">
                                <Icon
                                    key={index}
                                    imageType={icon}
                                    width={22}
                                    height={22}
                                    color={theme.primary}
                                    fillColor={theme.primary}
                                />
                            </a>

                        </Link>
                    })}
                </div>

                <Button fullWidth onClick={() => router.push(props.route)}>
                    View Jobs
                </Button>
            </div>
        </Card>
    );
};

export default WorkPlaceCard;
