import apiSlice from "@/controller/apiSlice";

export const BreedSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchBreeds: builder.query({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = BreedSlice;
