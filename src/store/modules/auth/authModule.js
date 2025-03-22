import apiSlice from "@/controller/apiSlice";

export const AuthSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation({
        query(loginData) {
          return {
            url: "/portal/auth/signIn",
            method: "POST",
            body: JSON.stringify(loginData),
          };
        },
      }),
      register: builder.mutation({
        query(registerData) {
          return {
            url: `/portal/auth/signUp`,
            method: "POST",
            body: JSON.stringify(registerData),
          };
      }
    }),  
    resetPass: builder.mutation({
        query(forgotData) {
          return {
            url: `/portal/auth/forgotpassword`,
            method: "POST",
            body: JSON.stringify(forgotData),
          };
        },
    }),
    reseting: builder.mutation({
        query(forgotData) {
          return {
            url: `/portal/auth/resetPassword`,
            method: "PUT",
            body: JSON.stringify(forgotData),
          };
        },
    }),
   
    };
  }})
  export const { useLoginMutation, useRegisterMutation, useResetPassMutation,useResetingMutation } =
  AuthSlice;