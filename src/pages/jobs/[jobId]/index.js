import Head from "next/head";

import JobDetailsHero from "@/components/LV3/JobDetails/HeroSection";
import LeftSideCard from "@/components/LV3/JobDetails/LeftSideCard";
import RightSideCard from "@/components/LV3/JobDetails/RightSideCard";
import { useRouter } from "next/router";
import { useFetchJobByIdQuery } from "@/store/modules/jobs/jobsModules";
import { useFetchFileByIdQuery } from "@/store/modules/file/fileModule";
import { useTheme } from "styled-components";
import { Image } from "@/components/LV1";

const JobDetails = () => {
  const { query } = useRouter();
  const theme = useTheme();
  const { data, isFetching } = useFetchJobByIdQuery({
    id: query.jobId,
    params: {
      populate: "experienceLevelId,jobTypeId,industryId",
    },
  });

  const { data: logoData } = useFetchFileByIdQuery({
    id: data?.data?.company?.logoId,
  });

  // console.log("company logo id", data?.data?.company?.logoId);
  // console.log(logoData?.data?.url);

  return (
    <>
      <Head>
        <title>Juncture Job Portal</title>
        <meta name="description" content="job portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen overflow-x-hidden space-y-6">
        {isFetching ? (
          <div className="w-full flex justify-center items-center h-[1000px]">
            <Image
              imageType="loading"
              width={40}
              height={40}
              color={theme.primary}
              fillColor={theme.primary}
            />
          </div>
        ) : (
          <div>
            <JobDetailsHero />
            <div className="w-full py-10 px-[10px] sm:px-[10px] md:px-[70px] lg:px-[156px] flex flex-col lg:flex-row gap-3 lg:gap-0">
              <>
                <div className="w-[100%] lg:w-[75%] mr-6">
                  <LeftSideCard data={data?.data} src={logoData?.data?.url} />
                </div>
                <div className="w-[100%] lg:w-[25%]">
                  <RightSideCard data={data?.data} src={logoData?.data?.url} />
                </div>
              </>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default JobDetails;

// import { wrapper } from "@/store/wrapper";
// import {
//   fetchJobById,
//   getRunningQueriesThunk,
// } from "@/store/modules/jobs/jobsModules";
// import store from "@/store";

// export async function getStaticPaths() {
//   const storeBox = store;
//   const result = await storeBox.dispatch(fetchJobById.initiate());

//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(
//   (store) => async (context) => {
//     const id = context.params?.jobId;
//     console.log("iiiiiid", id);

//     if (id) {
//       store.dispatch(fetchJobById.initiate(id));
//     }

//     const data = await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     console.log("ddddd", data);

//     return {
//       props: {
//         data,
//       },
//     };
//   }
// );

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const id = context.params?.jobId;

//     console.log("jobIdddd", id);
//     console.log("context", context);
//     // store.dispatch(fetchJobById.initiate(id));

//     // await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
