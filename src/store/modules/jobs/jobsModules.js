import apiSlice from "@/controller/apiSlice";
import queryString from "query-string";

export const JobSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchIndustries: builder.query({
        query() {
          return "/industry";
        },
      }),
      fetchJobFunction: builder.query({
        query(params) {
          return `/jobFunction?${queryString.stringify(params)}`;
        },
      }),
      fetchExperiences: builder.query({
        query() {
          return "/experienceLevel";
        },
      }),
      fetchEmploymentType: builder.query({
        query() {
          return "/jobType";
        },
      }),
      fetchJobs: builder.query({
        query(params) {
          return {
            url: `/portal/job?${queryString.stringify(params.query)}`,
            headers: {
              Authorization: `Bearer ${params.token ? params.token : ""}`,
            },
          };
        },
      }),
      fetchJobById: builder.query({
        query(params) {
          return {
            url: `/portal/job/${params.id}?${queryString.stringify(
              params.params
            )}`,
            headers: {
              Authorization: `Bearer ${params.token ? params.token : ""}`,
            },
          };
        },
      }),
      createJob: builder.mutation({
        query({token, data}){
          return {
            url: '/portal/applicant',
            body: data,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token ? token : ""}`,
            },
          }
        }
      })
    };
  },
});

export const {
  useFetchJobsQuery,
  useFetchJobFunctionQuery,
  useFetchIndustriesQuery,
  useFetchEmploymentTypeQuery,
  useFetchExperiencesQuery,
  useFetchJobByIdQuery,
    useCreateJobMutation
  // util: { getRunningQueriesThunk },
} = JobSlice;

// export const { fetchJobById, fetchJobs } = JobSlice.endpoints;
