import React from "react";
import {BsFillPersonFill, BsLinkedin, BsPinMapFill} from "react-icons/bs";
import {FaFacebook} from "react-icons/fa";

const LeftSideCard = ({data, src}) => {
    return (
        <div>
            <div className="border border-gray-300 rounded p-4">
                <div className="flex items-center">
                    <div className="mr-4">
                        <img src={src} alt="Logo" className="h-[120px]"/>
                    </div>
                    <div className="grid grid-rows-3 gap-1">
                        <p className="text-lg font-bold">{data?.jobTitle}</p>
                        <p className="text-gray-400">{data?.company?.name}</p>
                        <div className="flex text-[13px] text-gray-400 items-center gap-1">
                            <BsPinMapFill size={15}/> {data?.location.city}
                        </div>
                        <div className="flex text-[13px] text-gray-400 items-center gap-1">
                            <BsFillPersonFill size={15}/> {data?.jobOpening} Job Openings
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap my-4 gap-3">
                    {data?.experienceLevelId?.map((el, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg bg-transparent px-6 py-3"
                        >
                            <p className="text-gray-500 mb-2">Experience Level</p>
                            <p>{el?.name}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col my-6 gap-3 ">
                    <div>
                        <h3 className="font-bold mb-3">Job Description</h3>
                        <p
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{__html: data?.jobDescription}}
                        />
                    </div>

                    {/* <div>
            <h3 className="font-bold mb-3">Responsibilities</h3>
            <p className="text-gray-600">
              Rework Horizon’s current company and product branding in close
              relationship with the Product team to establish and maintain a
              coherent, elegant and relevant Brand Style Guide Create original
              visuals to help clearly communicate scientific and technical ideas
              on the company website (in product videos, illustrations for
              documentation) and support the company’s communications strategy
              in an appealing and unified way Collaborate with other members of
              the design team to ensure a cohesive visual identity for the
              company Provide the marketing & communication team easy to use
              templates Communicate and collaborate with the engineering &
              scientific teams to have a better understanding of the technology
              and the software Share your ideas with your peers and iterate Stay
              aware of design and marketing trends
            </p>
          </div> */}

                    <div>
                        <h3 className="font-bold mb-3">Requirements</h3>
                        <p
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{__html: data?.jobRequirements}}
                        />
                    </div>

                    {/* <div>
            <h3 className="font-bold mb-3">Preferred Experience</h3>
            <p className="text-gray-600">
              Motion design experience is highly appreciated, and video editing
              and print are an added bonus. Previous experience with unusual /
              atypical projects. Interests (even very basic) in science /
              physics, ideally shown through previous work.
            </p>
          </div> */}
                </div>

                <div className="flex gap-2 items-center">
                    Share this job :
                    <div
                        // href={
                        //     data?.company?.socialLinks?.filter((el) => el.type === "Facebook")
                        //         ?.length > 0
                        //         ? data?.company?.socialLinks?.filter(
                        //             (el) => el.type === "Facebook"
                        //         )?.[0]?.link
                        //         : ""
                        // }
                        // target="_blank"
                    >
                        <button
                            className="bg-blue-600 gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center">
                            <FaFacebook/>
                            <span>Facebook</span>
                        </button>
                    </div>
                    <div
                        // href={
                        //     data?.company?.socialLinks?.filter((el) => el.type === "Facebook")
                        //         ?.length > 0
                        //         ? data?.company?.socialLinks?.filter(
                        //             (el) => el.type === "Facebook"
                        //         )?.[0]?.link
                        //         : ""
                        // }
                        // target="_blank"
                    >
                        <button
                            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2">
                            <BsLinkedin/>
                            <span>LinkedIn</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideCard;
