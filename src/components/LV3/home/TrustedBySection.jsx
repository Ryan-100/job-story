import Image from "next/image";
import {SwiperSlide} from "swiper/react";

import Section from "./section-container/Section";
import {Text} from "@/components/LV1";
import {Swiper} from "@/components/LV2/Swiper";

const TrustedBySection = () => {
    return (
        <Section title="Trusted By">
            {/* <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 place-content-center gap-6"> */}
            <div className="w-auto sm:w-[640px] md:w-[900px] lg:w-auto">
                <Swiper slidesPerView={5}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="flex flex-col items-center justify-center "
                                key={index}
                            >
                                <div
                                    className="w-[65px] sm:w-[80px] md:w-[110px] lg:w-[135px] h-[65px] xs:h-[80px] sm:h-[103px] flex justify-center items-center">
                                    <Image
                                        src="/images/logo.svg"
                                        width={90}
                                        height={103}
                                        alt="logo"
                                    />
                                </div>

                                <Text>{"company_name"}</Text>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
};

export default TrustedBySection;
