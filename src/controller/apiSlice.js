import { getToken } from "@/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { HYDRATE } from "next-redux-wrapper";


const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://juncturedev.xyz/api/v1",
    prepareHeaders: (headers) => {
      const token = getToken();
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("x-api-token", "cbfb51a2-84b6-4025-a3e2-ed8616edf311");
      headers.set("Authorization", `Bearer ${token ? token : ""}`);
      return headers;
    },
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});

export default apiSlice;
