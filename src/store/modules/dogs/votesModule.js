import apiSlice from '@/controller/apiSlice';

export const VotesSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchVotes: builder.query({
        query: (limit = 10) => {
          return `/user`;
        },
      }),
    };
  },
});

export const { useFetchVotesQuery } = VotesSlice;
