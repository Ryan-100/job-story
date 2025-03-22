import apiSlice from "@/controller/apiSlice";

export const UserSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      getMe: builder.query({
        query() {
          return "/portal/auth/me";
        },
        providesTags: ["Users"],
      }),
      getUserApplication: builder.query({
        query() {
          return `portal/applicant/me`;
        },
        providesTags: ["Users"],
      }),
      getUserDetails: builder.query({
        query(id) {
          return `/normal-user/${id}`;
        },
        providesTags: ["Users"],
      }),
      updateUserDetails: builder.mutation({
        query(updatedDetails) {
          return {
            url: `/normal-user/${updatedDetails._id}`,
            method: "PUT",
            body: JSON.stringify(updatedDetails),
          };
        },
        invalidatesTags: ["Users"],
      }),
      updateUserApplication: builder.mutation({
        query(updatedData) {
          return {
            url: `/portal/applicant/me`,
            method: "POST",
            body: JSON.stringify(updatedData),
          };
        },
      }),
    };
  },
});

export const {
  useGetMeQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useGetUserApplicationQuery,
  useUpdateUserApplicationMutation,
} = UserSlice;
