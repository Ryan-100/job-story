import { useTheme } from "styled-components";

import { Title } from "@/components/LV1";
import { BsFillPersonFill, BsFillBookmarkFill, BsEye } from "react-icons/bs";
import twitterLogo from "./47-473775_google-transparent-background-twitter-logo.png.jpeg";
import { useRouter } from "next/router";

const RightSideCard = ({ data, src }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleApplyJob = () => {
    router.push(`/jobs/${data?._id}/apply`);
  };
  return (
    <div class="flex flex-col">
      <div className="border border-gray-300 rounded p-4">
        <h2 className="text-lg font-medium mb-2">Job Overview</h2>

        <div className="flex flex-col md:flex-row lg:flex-col flex-wrap gap-0 md:gap-2">
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Job Title</p>
              <p className="text-sm text-gray-600">{data?.jobTitle}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Experience</p>
              <p className="text-sm text-gray-600">
                {data?.experienceLevelId?.map((el) => el.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Location</p>
              <p className="text-sm text-gray-600">{data?.location.city}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Salary</p>
              <p className="text-sm text-gray-600">
                {data?.salary?.min && data?.salary.max
                  ? data.salary.min + " - " + data.salary.max
                  : "Negotiable"}
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Job Type</p>
              <p className="text-sm text-gray-600">
                {data?.jobTypeId?.map((el) => el.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row items-center my-3 md:text-center lg:text-start">
            <div className="bg-violet-100 rounded-full p-2">
              <BsFillPersonFill
                size={30}
                color={theme.primary}
                fill={theme.primary}
              />
            </div>

            <div className="ml-4 md:ml-0 lg:ml-4">
              <p className="text-md font-small bold">Industry</p>
              <p className="text-sm text-gray-600">
                {data?.industryId?.map((el) => el.name).join(", ")}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleApplyJob}
          className="w-full my-3  p-3 rounded text-white"
          style={{ backgroundColor: "#5C26D2" }}
        >
          Apply Now
        </button>

        {/* <button
          size="md"
          className="w-full my-3 bg-transparent p-3 rounded text-white flex items-center justify-center gap-2"
          style={{ color: "#5C26D2", border: "1px solid #5C26D2" }}
        >
          <BsFillBookmarkFill color={theme.primary} fill={theme.primary} />
          Add Bookmark
        </button> */}
      </div>
      <div className="border border-gray-300 rounded p-4 mt-4 flex flex-col justify-center items-center">
        <img src={src} alt="Logo" class="h-12 mb-2" />
        <Title>{data?.company?.name}</Title>

        <div className="flex items-center mb-3">
          <div className="bg-violet-100 rounded-full p-2">
            <BsFillPersonFill
              size={30}
              color={theme.primary}
              fill={theme.primary}
            />
          </div>

          <div className="ml-4">
            <p className="text-md font-small bold">Website</p>
            <p className="text-sm text-gray-600">
              {data?.company?.websiteLinks?.[0]}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push(`/company/${data?.companyId}`)}
          size="md"
          className="w-full my-3 bg-transparent p-3 rounded text-white flex items-center justify-center gap-2"
          style={{ color: "#5C26D2", border: "1px solid #5C26D2" }}
        >
          <BsEye size={24} />
          View Profile
        </button>
      </div>
    </div>
  );
};

export default RightSideCard;
